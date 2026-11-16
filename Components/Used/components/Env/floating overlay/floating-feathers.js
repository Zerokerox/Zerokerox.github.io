/**
 * FLOATING FEATHERS OVERLAY V1.0
 *
 * Anime / Dreamy / Fantasy Aesthetic
 * Shadow DOM + Canvas 2D
 * 3D-like Feather Rotation
 * Depth / Wind / Glow / Highlight
 * Responsive / High DPI
 * Reduced Motion / Pause / Resume
 */

(() => {
  "use strict";

  if (customElements.get("feather-overlay")) return;

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
    </style>

    <div id="root">
      <canvas id="feathers"></canvas>
    </div>
  `;

  class FeatherOverlay extends HTMLElement {
    static get observedAttributes() {
      return ["count", "speed", "size", "opacity", "wind", "glow", "paused"];
    }

    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.canvas = this.shadowRoot.querySelector("#feathers");

      this.ctx = this.canvas.getContext("2d", {
        alpha: true,
      });

      this.width = 0;
      this.height = 0;
      this.dpr = 1;

      this.feathers = [];

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

      this.handleReducedMotion();

      this.handleVisibility = () => {
        if (document.hidden) {
          this.pause();
        } else if (!this.hasAttribute("paused")) {
          this.resume();
        }
      };

      this.resizeObserver = null;
    }

    // =========================
    // SETTINGS
    // =========================

    getNumber(name, fallback, min, max) {
      const value = Number(this.getAttribute(name));

      if (!Number.isFinite(value)) {
        return fallback;
      }

      return Math.max(min, Math.min(max, value));
    }

    get count() {
      return Math.floor(this.getNumber("count", 24, 0, 150));
    }

    get speed() {
      return this.getNumber("speed", 1, 0, 3);
    }

    get size() {
      return this.getNumber("size", 1, 0.2, 3);
    }

    get opacity() {
      return this.getNumber("opacity", 0.85, 0, 1);
    }

    get wind() {
      return this.getNumber("wind", 0.7, -3, 3);
    }

    get glow() {
      return this.getNumber("glow", 0.7, 0, 2);
    }

    // =========================
    // LIFECYCLE
    // =========================

    connectedCallback() {
      this.destroyed = false;

      this.resize();

      this.generateFeathers();

      this.resizeObserver = new ResizeObserver(() => {
        this.resize();
      });

      this.resizeObserver.observe(this);

      document.addEventListener("visibilitychange", this.handleVisibility);

      this.reducedMotion.addEventListener("change", this.handleReducedMotion);

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

      if (name === "count" || name === "size") {
        this.generateFeathers();
      }
    }

    // =========================
    // UTILITIES
    // =========================

    random(min, max) {
      return min + Math.random() * (max - min);
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.canvas.width = Math.round(this.width * this.dpr);

      this.canvas.height = Math.round(this.height * this.dpr);

      this.canvas.style.width = this.width + "px";
      this.canvas.style.height = this.height + "px";

      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

      // Keep existing particles in the visible area.
      for (const p of this.feathers) {
        p.x = Math.min(p.x, this.width);
        p.y = Math.min(p.y, this.height);
      }
    }

    // =========================
    // PARTICLE GENERATION
    // =========================

    createFeather(initial = false) {
      const depth = this.random(0.35, 1.15);

      return {
        x: this.random(0, this.width),

        y: initial ? this.random(-this.height, this.height) : -85,

        depth,

        scale: this.random(0.65, 1.2) * depth * this.size,

        rotation: this.random(0, Math.PI * 2),

        spin: this.random(-0.012, 0.012),

        speed: this.random(0.35, 1.15) * depth,

        sway: this.random(0.5, 2.2),

        phase: this.random(0, Math.PI * 2),

        opacity: this.random(0.45, 1),

        tilt: this.random(0.3, 1),

        hue: this.random(-8, 8),
      };
    }

    generateFeathers() {
      this.feathers = Array.from({ length: this.count }, () =>
        this.createFeather(true),
      );
    }

    // =========================
    // DRAW FEATHER SHAPE
    // =========================

    drawFeather(p, time) {
      const ctx = this.ctx;

      const flip = Math.cos(p.phase + time * p.spin * 3);

      const perspective = Math.max(0.12, Math.abs(flip));

      const sway = Math.sin(time * 0.001 * p.sway + p.phase);

      ctx.save();

      ctx.translate(p.x, p.y);

      ctx.rotate(p.rotation + sway * 0.18);

      ctx.scale(p.scale * (flip < 0 ? -1 : 1), p.scale);

      // Simulated 3D side rotation.
      ctx.scale(perspective, 1);

      ctx.globalAlpha = p.opacity * this.opacity;

      // Soft glow.
      if (this.glow > 0) {
        ctx.shadowColor = "rgba(220,240,255,0.9)";

        ctx.shadowBlur = 12 * this.glow * p.depth;
      }

      // Feather silhouette.
      const gradient = ctx.createLinearGradient(-12, -32, 12, 32);

      gradient.addColorStop(0, `hsl(205, 35%, ${98 + p.hue * 0.05}%)`);

      gradient.addColorStop(0.45, "rgba(235,245,255,0.98)");

      gradient.addColorStop(1, "rgba(190,215,240,0.85)");

      ctx.beginPath();

      ctx.moveTo(0, -34);

      ctx.bezierCurveTo(5, -27, 17, -13, 14, 3);

      ctx.bezierCurveTo(12, 17, 4, 28, 0, 34);

      ctx.bezierCurveTo(-5, 26, -15, 13, -14, 1);

      ctx.bezierCurveTo(-13, -15, -5, -28, 0, -34);

      ctx.closePath();

      ctx.fillStyle = gradient;
      ctx.fill();

      // Remove shadow from internal details.
      ctx.shadowBlur = 0;

      // Feather rachis (central stem).
      ctx.beginPath();

      ctx.moveTo(0, -32);
      ctx.quadraticCurveTo(1, 5, 0, 33);

      ctx.strokeStyle = "rgba(155,180,205,0.85)";
      ctx.lineWidth = 0.9;

      ctx.stroke();

      // Feather barbs.
      for (let i = 0; i < 13; i++) {
        const t = i / 13;

        const y = -25 + t * 51;

        const width = Math.sin(t * Math.PI) * 12;

        const alpha = 0.25 + Math.sin(t * Math.PI) * 0.3;

        ctx.strokeStyle = `rgba(145,175,205,${alpha})`;

        ctx.lineWidth = 0.55;

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.quadraticCurveTo(width * 0.5, y - 3, width, y - 5);

        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.quadraticCurveTo(-width * 0.5, y - 3, -width, y - 5);

        ctx.stroke();
      }

      // White highlight.
      ctx.beginPath();

      ctx.moveTo(-3, -23);

      ctx.quadraticCurveTo(-7, -5, -2, 15);

      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = 1.2;

      ctx.stroke();

      ctx.restore();
    }

    // =========================
    // UPDATE PARTICLES
    // =========================

    updateFeathers(delta, timestamp) {
      const factor = delta / 16.67;

      const time = timestamp;

      for (const p of this.feathers) {
        const sway = Math.sin(time * 0.001 * p.sway + p.phase);

        p.y += p.speed * this.speed * factor;

        p.x += (this.wind * 0.65 + sway * 0.65) * factor * p.depth;

        p.rotation += p.spin * factor * this.speed;

        // Screen boundaries.
        if (p.y > this.height + 90) {
          Object.assign(p, this.createFeather(false));

          p.y = -85;
        }

        if (p.x > this.width + 70) {
          p.x = -70;
        }

        if (p.x < -70) {
          p.x = this.width + 70;
        }
      }
    }

    // =========================
    // RENDER
    // =========================

    render(timestamp) {
      const ctx = this.ctx;

      ctx.clearRect(0, 0, this.width, this.height);

      // Draw distant feathers first.
      const sorted = [...this.feathers].sort((a, b) => a.depth - b.depth);

      for (const p of sorted) {
        this.drawFeather(p, timestamp);
      }
    }

    // =========================
    // ANIMATION LOOP
    // =========================

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

      this.updateFeathers(delta, timestamp);

      this.render(timestamp);

      this.animationId = requestAnimationFrame(this.animate);
    };

    // =========================
    // PAUSE / RESUME
    // =========================

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

    // =========================
    // CLEANUP
    // =========================

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

      this.feathers = [];

      this.ctx?.clearRect(0, 0, this.width, this.height);

      this.destroyed = true;
    }
  }

  // =========================
  // REGISTER
  // =========================

  customElements.define("feather-overlay", FeatherOverlay);
})();
