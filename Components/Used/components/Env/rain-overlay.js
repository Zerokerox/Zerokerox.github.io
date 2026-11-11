/**
 * Rain Overlay Web Component
 * Version: 1.0.0
 *
 * Features:
 * - Falling rain particles
 * - Glass droplets
 * - Running water streaks
 * - Wet glass atmosphere
 * - Shadow DOM isolation
 * - Canvas rendering
 * - Responsive viewport
 * - Reduced motion support
 * - Auto cleanup
 *
 * Usage:
 * <script src="/rain-overlay.js"></script>
 * <rain-overlay intensity="0.7"></rain-overlay>
 */

(() => {
  "use strict";

  // Prevent duplicate registration
  if (customElements.get("rain-overlay")) return;

  const COMPONENT_NAME = "rain-overlay";

  const TEMPLATE = document.createElement("template");

  TEMPLATE.innerHTML = `
    <style>
      :host {
        position: fixed;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 2147483000;
        isolation: isolate;
        contain: strict;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      #rain-root {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
      }

      canvas {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      #rain-canvas {
        z-index: 1;
      }

      #glass-canvas {
        z-index: 2;
      }

      #atmosphere {
        position: absolute;
        inset: 0;
        z-index: 3;
        pointer-events: none;
        opacity: 0.12;
        background:
          radial-gradient(
            ellipse at 50% 50%,
            transparent 45%,
            rgba(30, 60, 90, 0.12) 100%
          );
      }

      @media (prefers-reduced-motion: reduce) {
        #rain-root {
          opacity: 0.65;
        }
      }
    </style>

    <div id="rain-root">
      <canvas id="rain-canvas"></canvas>
      <canvas id="glass-canvas"></canvas>
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
      this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));

      this.rainCanvas = this.shadowRoot.querySelector("#rain-canvas");

      this.glassCanvas = this.shadowRoot.querySelector("#glass-canvas");

      this.rainCtx = this.rainCanvas.getContext("2d");

      this.glassCtx = this.glassCanvas.getContext("2d");

      this.width = 0;
      this.height = 0;
      this.dpr = 1;

      this.raindrops = [];
      this.glassDrops = [];
      this.streaks = [];

      this.animationId = null;
      this.lastFrame = 0;
      this.running = false;
      this.destroyed = false;

      this.resizeObserver = null;

      this.reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      this.handleReducedMotion = () => {
        this.maxFPS = this.reducedMotion.matches ? 15 : 60;
      };

      this.maxFPS = this.reducedMotion.matches ? 15 : 60;

      this.handleVisibility = () => {
        if (document.hidden) {
          this.pause();
        } else if (!this.hasAttribute("paused")) {
          this.resume();
        }
      };
    }

    connectedCallback() {
      this.destroyed = false;

      this.setup();
    }

    disconnectedCallback() {
      this.destroy();
    }

    attributeChangedCallback() {
      if (this.isConnected && !this.destroyed) {
        this.updateSettings();
      }
    }

    get intensity() {
      const value = Number(this.getAttribute("intensity"));
      return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0.7;
    }

    get enabledDroplets() {
      return this.getAttribute("droplets") !== "false";
    }

    get enabledFalling() {
      return this.getAttribute("falling") !== "false";
    }

    get enabledGlass() {
      return this.getAttribute("glass") !== "false";
    }

    setup() {
      this.resize();

      this.resizeObserver = new ResizeObserver(() => {
        this.resize();
      });

      this.resizeObserver.observe(this);

      document.addEventListener("visibilitychange", this.handleVisibility);

      this.reducedMotion.addEventListener("change", this.handleReducedMotion);

      this.generateParticles();
      this.updateSettings();

      if (!this.hasAttribute("paused")) {
        this.resume();
      }
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      [this.rainCanvas, this.glassCanvas].forEach((canvas) => {
        canvas.width = Math.round(this.width * this.dpr);
        canvas.height = Math.round(this.height * this.dpr);

        canvas.style.width = this.width + "px";
        canvas.style.height = this.height + "px";
      });

      this.rainCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

      this.glassCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

      this.generateParticles();
    }

    generateParticles() {
      const intensity = this.intensity;

      // Falling rain
      const rainCount = Math.floor((this.width * intensity) / 12);

      this.raindrops = Array.from({ length: rainCount }, () =>
        this.createRain(),
      );

      // Glass droplets
      const dropCount = Math.floor(12 + intensity * 55);

      this.glassDrops = Array.from({ length: dropCount }, () =>
        this.createGlassDrop(),
      );

      // Running water
      this.streaks = Array.from(
        { length: Math.floor(4 + intensity * 12) },
        () => this.createStreak(),
      );
    }

    random(min, max) {
      return min + Math.random() * (max - min);
    }

    createRain() {
      return {
        x: this.random(0, this.width),
        y: this.random(-this.height, this.height),
        length: this.random(8, 24),
        speed: this.random(7, 15),
        opacity: this.random(0.08, 0.35),
        width: this.random(0.5, 1.2),
      };
    }

    createGlassDrop() {
      return {
        x: this.random(0, this.width),
        y: this.random(0, this.height),
        radius: this.random(2, 8),
        speed: this.random(0.05, 0.6),
        opacity: this.random(0.15, 0.5),
        drift: this.random(-0.15, 0.15),
        wobble: this.random(0, Math.PI * 2),
      };
    }

    createStreak() {
      return {
        x: this.random(0, this.width),
        y: this.random(0, this.height),
        length: this.random(25, 100),
        speed: this.random(0.4, 1.5),
        width: this.random(1, 3),
        opacity: this.random(0.06, 0.2),
      };
    }

    updateSettings() {
      this.generateParticles();

      this.shadowRoot.querySelector("#rain-canvas").style.display = this
        .enabledFalling
        ? "block"
        : "none";

      this.shadowRoot.querySelector("#glass-canvas").style.display =
        this.enabledDroplets || this.enabledGlass ? "block" : "none";

      this.shadowRoot.querySelector("#atmosphere").style.display = this
        .enabledGlass
        ? "block"
        : "none";
    }

    drawRain(delta) {
      const ctx = this.rainCtx;
      const factor = delta / 16.67;

      ctx.clearRect(0, 0, this.width, this.height);

      if (!this.enabledFalling) return;

      for (const drop of this.raindrops) {
        drop.y += drop.speed * factor;

        if (drop.y > this.height + drop.length) {
          drop.y = -drop.length;
          drop.x = this.random(0, this.width);
        }

        ctx.beginPath();

        ctx.strokeStyle = `rgba(190, 220, 255, ${drop.opacity})`;

        ctx.lineWidth = drop.width;
        ctx.lineCap = "round";

        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 1.5, drop.y + drop.length);

        ctx.stroke();
      }
    }

    drawGlass(delta) {
      const ctx = this.glassCtx;
      const factor = delta / 16.67;

      ctx.clearRect(0, 0, this.width, this.height);

      // Glass droplets
      if (this.enabledDroplets) {
        for (const drop of this.glassDrops) {
          drop.wobble += 0.015 * factor;

          drop.y += drop.speed * factor;
          drop.x += drop.drift * factor;

          if (drop.y > this.height + 10) {
            drop.y = -10;
            drop.x = this.random(0, this.width);
          }

          if (drop.x < -10) drop.x = this.width + 10;
          if (drop.x > this.width + 10) drop.x = -10;

          const gradient = ctx.createRadialGradient(
            drop.x - drop.radius * 0.3,
            drop.y - drop.radius * 0.3,
            0,
            drop.x,
            drop.y,
            drop.radius,
          );

          gradient.addColorStop(0, `rgba(255,255,255,${drop.opacity * 0.8})`);

          gradient.addColorStop(
            0.5,
            `rgba(180,220,255,${drop.opacity * 0.25})`,
          );

          gradient.addColorStop(1, `rgba(100,160,220,${drop.opacity * 0.05})`);

          ctx.beginPath();

          ctx.fillStyle = gradient;

          ctx.ellipse(
            drop.x,
            drop.y,
            drop.radius * 0.75,
            drop.radius,
            0,
            0,
            Math.PI * 2,
          );

          ctx.fill();

          // Highlight
          ctx.beginPath();

          ctx.fillStyle = `rgba(255,255,255,${drop.opacity * 0.7})`;

          ctx.arc(
            drop.x - drop.radius * 0.3,
            drop.y - drop.radius * 0.35,
            Math.max(0.5, drop.radius * 0.12),
            0,
            Math.PI * 2,
          );

          ctx.fill();
        }
      }

      // Running water streaks
      if (this.enabledGlass) {
        for (const streak of this.streaks) {
          streak.y += streak.speed * factor;

          if (streak.y > this.height + streak.length) {
            streak.y = -streak.length;
            streak.x = this.random(0, this.width);
          }

          const gradient = ctx.createLinearGradient(
            streak.x,
            streak.y,
            streak.x,
            streak.y + streak.length,
          );

          gradient.addColorStop(0, "rgba(255,255,255,0)");

          gradient.addColorStop(0.5, `rgba(210,235,255,${streak.opacity})`);

          gradient.addColorStop(1, "rgba(255,255,255,0)");

          ctx.beginPath();

          ctx.strokeStyle = gradient;
          ctx.lineWidth = streak.width;
          ctx.lineCap = "round";

          ctx.moveTo(streak.x, streak.y);
          ctx.lineTo(streak.x + 1, streak.y + streak.length);

          ctx.stroke();
        }
      }
    }

    animate = (timestamp) => {
      if (!this.running || this.destroyed) return;

      const frameInterval = 1000 / this.maxFPS;

      if (timestamp - this.lastFrame < frameInterval) {
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
      if (this.destroyed || this.running) return;

      if (document.hidden) return;

      this.running = true;
      this.lastFrame = 0;

      this.animationId = requestAnimationFrame(this.animate);
    }

    destroy() {
      this.pause();

      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }

      document.removeEventListener("visibilitychange", this.handleVisibility);

      this.reducedMotion.removeEventListener(
        "change",
        this.handleReducedMotion,
      );

      this.raindrops = [];
      this.glassDrops = [];
      this.streaks = [];

      this.rainCtx?.clearRect(0, 0, this.width, this.height);

      this.glassCtx?.clearRect(0, 0, this.width, this.height);

      this.destroyed = true;
    }
  }

  customElements.define(COMPONENT_NAME, RainOverlay);
})();
