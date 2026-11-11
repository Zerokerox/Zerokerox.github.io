/**
 * RAIN OVERLAY v2.0
 * High Visibility Hybrid Rain
 *
 * Standalone Web Component
 * Shadow DOM + Canvas
 *
 * Usage:
 * <rain-overlay intensity="0.8"></rain-overlay>
 */

(() => {
  "use strict";

  if (customElements.get("rain-overlay")) return;

  const template = document.createElement("template");

  template.innerHTML = `
    <style>
      :host {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        display: block;
        overflow: hidden;
        pointer-events: none;
        z-index: 2147483000;
        contain: strict;
        isolation: isolate;
      }

      #root {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
      }

      canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        pointer-events: none;
      }

      #rain {
        z-index: 1;
      }

      #glass {
        z-index: 2;
      }

      #atmosphere {
        position: absolute;
        inset: 0;
        z-index: 3;
        pointer-events: none;
        background:
          radial-gradient(
            ellipse at center,
            transparent 45%,
            rgba(50, 90, 120, 0.055) 100%
          );
      }
    </style>

    <div id="root">
      <canvas id="rain"></canvas>
      <canvas id="glass"></canvas>
      <div id="atmosphere"></div>
    </div>
  `;

  class RainOverlay extends HTMLElement {
    static get observedAttributes() {
      return ["intensity", "droplets", "falling", "glass", "paused"];
    }

    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.rainCanvas = this.shadowRoot.querySelector("#rain");

      this.glassCanvas = this.shadowRoot.querySelector("#glass");

      this.rainCtx = this.rainCanvas.getContext("2d");

      this.glassCtx = this.glassCanvas.getContext("2d");

      this.width = 0;
      this.height = 0;
      this.dpr = 1;

      this.rainDrops = [];
      this.glassDrops = [];
      this.streaks = [];

      this.running = false;
      this.destroyed = false;
      this.animationId = null;
      this.lastFrame = 0;

      this.maxFPS = 60;

      this.reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      this.handleReducedMotion = () => {
        this.maxFPS = this.reducedMotion.matches ? 20 : 60;
      };

      this.handleVisibility = () => {
        if (document.hidden) {
          this.pause();
        } else if (!this.hasAttribute("paused")) {
          this.resume();
        }
      };

      this.resizeObserver = null;
    }

    get intensity() {
      const value = Number(this.getAttribute("intensity"));

      return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0.8;
    }

    get dropletsEnabled() {
      return this.getAttribute("droplets") !== "false";
    }

    get fallingEnabled() {
      return this.getAttribute("falling") !== "false";
    }

    get glassEnabled() {
      return this.getAttribute("glass") !== "false";
    }

    connectedCallback() {
      this.destroyed = false;

      this.resize();
      this.generateParticles();

      this.resizeObserver = new ResizeObserver(() => {
        this.resize();
        this.generateParticles();
      });

      this.resizeObserver.observe(this);

      document.addEventListener("visibilitychange", this.handleVisibility);

      this.reducedMotion.addEventListener("change", this.handleReducedMotion);

      this.updateSettings();

      if (!this.hasAttribute("paused")) {
        this.resume();
      }
    }

    disconnectedCallback() {
      this.destroy();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue || !this.isConnected || this.destroyed) return;

      if (name === "paused") {
        if (newValue !== null) {
          this.pause();
        } else {
          this.resume();
        }
        return;
      }

      this.updateSettings();
    }

    random(min, max) {
      return min + Math.random() * (max - min);
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      [this.rainCanvas, this.glassCanvas].forEach((canvas) => {
        canvas.width = Math.round(this.width * this.dpr);
        canvas.height = Math.round(this.height * this.dpr);

        canvas.style.width = this.width + "px";
        canvas.style.height = this.height + "px";
      });

      this.rainCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

      this.glassCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    generateParticles() {
      const intensity = this.intensity;

      // Falling rain particles
      const rainCount = Math.floor((this.width * intensity) / 7);

      this.rainDrops = Array.from({ length: rainCount }, () => ({
        x: this.random(0, this.width),
        y: this.random(-this.height, this.height),
        length: this.random(12, 34),
        speed: this.random(7, 16),
        opacity: this.random(0.28, 0.65),
        width: this.random(0.8, 1.7),
        drift: this.random(-1.2, -0.2),
      }));

      // Larger and smaller glass droplets
      const dropCount = Math.floor(30 + intensity * 110);

      this.glassDrops = Array.from({ length: dropCount }, () => ({
        x: this.random(0, this.width),
        y: this.random(0, this.height),
        rx: this.random(2, 7),
        ry: this.random(4, 11),
        speed: this.random(0.1, 0.9),
        opacity: this.random(0.35, 0.8),
        drift: this.random(-0.12, 0.12),
        wobble: this.random(0, Math.PI * 2),
      }));

      // Large prominent droplets
      const largeCount = Math.floor(8 + intensity * 22);

      this.largeDrops = Array.from({ length: largeCount }, () => ({
        x: this.random(0, this.width),
        y: this.random(0, this.height),
        rx: this.random(6, 13),
        ry: this.random(9, 19),
        speed: this.random(0.25, 1.0),
        opacity: this.random(0.55, 0.85),
        drift: this.random(-0.2, 0.2),
      }));

      // Long running water trails
      this.streaks = Array.from(
        { length: Math.floor(10 + intensity * 20) },
        () => ({
          x: this.random(0, this.width),
          y: this.random(0, this.height),
          length: this.random(35, 130),
          speed: this.random(0.4, 1.8),
          width: this.random(1, 2.5),
          opacity: this.random(0.18, 0.42),
        }),
      );
    }

    updateSettings() {
      this.generateParticles();

      this.rainCanvas.style.display = this.fallingEnabled ? "block" : "none";

      this.glassCanvas.style.display =
        this.dropletsEnabled || this.glassEnabled ? "block" : "none";

      this.shadowRoot.querySelector("#atmosphere").style.display = this
        .glassEnabled
        ? "block"
        : "none";
    }

    drawRain(delta) {
      const ctx = this.rainCtx;
      const factor = delta / 16.67;

      ctx.clearRect(0, 0, this.width, this.height);

      if (!this.fallingEnabled) return;

      for (const p of this.rainDrops) {
        p.y += p.speed * factor;
        p.x += p.drift * factor;

        if (p.y > this.height + p.length) {
          p.y = -p.length;
          p.x = this.random(0, this.width);
        }

        if (p.x < -20) p.x = this.width + 20;

        // Dark outline: visible on white backgrounds
        ctx.beginPath();
        ctx.strokeStyle = `rgba(65, 100, 130, ${p.opacity * 0.55})`;
        ctx.lineWidth = p.width + 1.5;
        ctx.lineCap = "round";

        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.drift, p.y + p.length);

        ctx.stroke();

        // Main rain reflection
        ctx.beginPath();
        ctx.strokeStyle = `rgba(120, 160, 195, ${p.opacity})`;
        ctx.lineWidth = p.width;
        ctx.lineCap = "round";

        ctx.moveTo(p.x - 0.4, p.y);
        ctx.lineTo(p.x + p.drift - 0.4, p.y + p.length);

        ctx.stroke();
      }
    }

    drawDroplet(ctx, p, large = false) {
      const rx = p.rx;
      const ry = p.ry;

      // Outer shadow
      ctx.beginPath();
      ctx.ellipse(p.x + 0.8, p.y + 1, rx + 0.8, ry + 1, 0, 0, Math.PI * 2);

      ctx.fillStyle = `rgba(35, 65, 90, ${p.opacity * 0.22})`;

      ctx.fill();

      // Main body
      const gradient = ctx.createRadialGradient(
        p.x - rx * 0.35,
        p.y - ry * 0.4,
        0.3,
        p.x,
        p.y,
        Math.max(rx, ry),
      );

      gradient.addColorStop(0, `rgba(255,255,255,${p.opacity * 0.95})`);

      gradient.addColorStop(0.35, `rgba(185,215,238,${p.opacity * 0.65})`);

      gradient.addColorStop(0.75, `rgba(105,145,180,${p.opacity * 0.28})`);

      gradient.addColorStop(1, `rgba(55,85,115,${p.opacity * 0.15})`);

      ctx.beginPath();

      ctx.ellipse(p.x, p.y, rx, ry, 0, 0, Math.PI * 2);

      ctx.fillStyle = gradient;
      ctx.fill();

      // Strong outer edge
      ctx.beginPath();

      ctx.ellipse(p.x, p.y, rx, ry, 0, 0, Math.PI * 2);

      ctx.strokeStyle = `rgba(65, 105, 140, ${p.opacity * 0.65})`;

      ctx.lineWidth = large ? 1.1 : 0.75;
      ctx.stroke();

      // Bright specular highlight
      ctx.beginPath();

      ctx.ellipse(
        p.x - rx * 0.3,
        p.y - ry * 0.35,
        Math.max(0.8, rx * 0.24),
        Math.max(1, ry * 0.16),
        -0.4,
        0,
        Math.PI * 2,
      );

      ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;

      ctx.fill();

      // Secondary lower reflection
      ctx.beginPath();

      ctx.ellipse(
        p.x + rx * 0.35,
        p.y + ry * 0.45,
        rx * 0.25,
        ry * 0.1,
        0,
        0,
        Math.PI * 2,
      );

      ctx.fillStyle = `rgba(55,95,130,${p.opacity * 0.3})`;

      ctx.fill();
    }

    drawGlass(delta) {
      const ctx = this.glassCtx;
      const factor = delta / 16.67;

      ctx.clearRect(0, 0, this.width, this.height);

      if (this.dropletsEnabled) {
        for (const p of this.glassDrops) {
          p.y += p.speed * factor;
          p.x += p.drift * factor;
          p.wobble += 0.02 * factor;

          if (p.y > this.height + 20) {
            p.y = -20;
            p.x = this.random(0, this.width);
          }

          this.drawDroplet(ctx, p);
        }

        for (const p of this.largeDrops) {
          p.y += p.speed * factor;
          p.x += p.drift * factor;

          if (p.y > this.height + 30) {
            p.y = -30;
            p.x = this.random(0, this.width);
          }

          this.drawDroplet(ctx, p, true);
        }
      }

      if (this.glassEnabled) {
        for (const s of this.streaks) {
          s.y += s.speed * factor;

          if (s.y > this.height + s.length) {
            s.y = -s.length;
            s.x = this.random(0, this.width);
          }

          // Dark water trail
          const gradient = ctx.createLinearGradient(
            s.x,
            s.y,
            s.x,
            s.y + s.length,
          );

          gradient.addColorStop(0, "rgba(65,100,135,0)");

          gradient.addColorStop(0.25, `rgba(75,110,145,${s.opacity})`);

          gradient.addColorStop(0.7, `rgba(115,155,190,${s.opacity * 0.8})`);

          gradient.addColorStop(1, "rgba(65,100,135,0)");

          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = s.width;
          ctx.lineCap = "round";

          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x + 1.5, s.y + s.length);

          ctx.stroke();

          // Water reflection line
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${s.opacity * 0.8})`;

          ctx.lineWidth = 0.8;

          ctx.moveTo(s.x - 0.5, s.y);
          ctx.lineTo(s.x + 0.5, s.y + s.length);

          ctx.stroke();
        }
      }
    }

    animate = (timestamp) => {
      if (!this.running || this.destroyed) return;

      const interval = 1000 / this.maxFPS;

      if (timestamp - this.lastFrame < interval) {
        this.animationId = requestAnimationFrame(this.animate);
        return;
      }

      const delta = this.lastFrame
        ? Math.min(timestamp - this.lastFrame, 50)
        : 16.67;

      this.lastFrame = timestamp;

      this.drawRain(delta);
      this.drawGlass(delta);

      this.animationId = requestAnimationFrame(this.animate);
    };

    pause() {
      this.running = false;

      if (this.animationId !== null) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }

    resume() {
      if (this.running || this.destroyed) return;
      if (document.hidden) return;

      this.running = true;
      this.lastFrame = 0;

      this.animationId = requestAnimationFrame(this.animate);
    }

    destroy() {
      if (this.destroyed) return;

      this.pause();

      this.resizeObserver?.disconnect();
      this.resizeObserver = null;

      document.removeEventListener("visibilitychange", this.handleVisibility);

      this.reducedMotion.removeEventListener(
        "change",
        this.handleReducedMotion,
      );

      this.rainDrops = [];
      this.glassDrops = [];
      this.largeDrops = [];
      this.streaks = [];

      this.rainCtx?.clearRect(0, 0, this.width, this.height);

      this.glassCtx?.clearRect(0, 0, this.width, this.height);

      this.destroyed = true;
    }
  }

  customElements.define("rain-overlay", RainOverlay);
})();
