/**
 * MAGIC PARTICLES OVERLAY V1.0
 *
 * Anime / Fantasy / Magical Aesthetic
 * Shadow DOM + Canvas 2D
 * Floating Particles + Star Sparkles
 * Glow / Aura / Twinkle / Wind
 * Multi Color Themes
 * Responsive / High DPI / FPS Control
 */

(() => {
  "use strict";

  if (customElements.get("magic-particles")) return;

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
      <canvas id="magic"></canvas>
    </div>
  `;

  class MagicParticles extends HTMLElement {
    static get observedAttributes() {
      return [
        "count",
        "speed",
        "size",
        "opacity",
        "glow",
        "wind",
        "color",
        "sparkles",
        "paused",
      ];
    }

    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.canvas = this.shadowRoot.querySelector("#magic");

      this.ctx = this.canvas.getContext("2d", {
        alpha: true,
      });

      this.width = 0;
      this.height = 0;
      this.dpr = 1;

      this.particles = [];

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
      return Math.floor(this.getNumber("count", 65, 0, 250));
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

    get glow() {
      return this.getNumber("glow", 1, 0, 2);
    }

    get wind() {
      return this.getNumber("wind", 0.4, -3, 3);
    }

    get color() {
      return this.getAttribute("color") || "gold";
    }

    get sparklesEnabled() {
      return this.getAttribute("sparkles") !== "false";
    }

    // =========================
    // COLOR PALETTE
    // =========================

    getPalette() {
      const palettes = {
        gold: ["#FFF4C2", "#FFD76A", "#FFB938", "#FFFDF2"],

        blue: ["#D8F7FF", "#83DFFF", "#49A9FF", "#F4FFFF"],

        pink: ["#FFE4F4", "#FFACD8", "#FF75B8", "#FFFFFF"],

        cyan: ["#E0FFFF", "#78F5FF", "#42C9FF", "#FFFFFF"],

        white: ["#FFFFFF", "#F2F7FF", "#DDEAFF", "#FFFFFF"],

        rainbow: ["#FFD76A", "#FF9EDB", "#83DFFF", "#C8A7FF", "#FFFFFF"],
      };

      return palettes[this.color] || palettes.gold;
    }

    // =========================
    // LIFECYCLE
    // =========================

    connectedCallback() {
      this.destroyed = false;

      this.resize();

      this.generateParticles();

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

      if (name === "count") {
        this.generateParticles();
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

      for (const p of this.particles) {
        p.x = Math.min(p.x, this.width);
        p.y = Math.min(p.y, this.height);
      }
    }

    // =========================
    // PARTICLE GENERATION
    // =========================

    createParticle(initial = false) {
      const depth = this.random(0.3, 1.2);

      const isStar = Math.random() < 0.22;

      return {
        x: this.random(0, this.width),

        y: initial ? this.random(0, this.height) : this.height + 20,

        depth,

        radius: this.random(1, 3.5) * depth * this.size,

        speed: this.random(0.25, 1.1) * depth,

        drift: this.random(-0.5, 0.5),

        phase: this.random(0, Math.PI * 2),

        frequency: this.random(0.5, 2),

        twinkleSpeed: this.random(0.015, 0.055),

        rotation: this.random(0, Math.PI * 2),

        rotationSpeed: this.random(-0.025, 0.025),

        opacity: this.random(0.35, 1),

        isStar,

        starSize: this.random(2, 6) * depth * this.size,

        colorIndex: Math.floor(Math.random() * this.getPalette().length),
      };
    }

    generateParticles() {
      this.particles = Array.from({ length: this.count }, () =>
        this.createParticle(true),
      );
    }

    // =========================
    // DRAW SOFT GLOW
    // =========================

    drawGlow(ctx, p, alpha, color) {
      if (this.glow <= 0) return;

      const radius = p.radius * (3 + this.glow * 2);

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);

      gradient.addColorStop(0, color + "66");

      gradient.addColorStop(0.35, color + "22");

      gradient.addColorStop(1, color + "00");

      ctx.globalAlpha = alpha * this.glow * 0.6;

      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

      ctx.fill();
    }

    // =========================
    // DRAW BASIC PARTICLE
    // =========================

    drawParticle(ctx, p, time) {
      const palette = this.getPalette();

      const color = palette[p.colorIndex % palette.length];

      const wave = (Math.sin(time * p.twinkleSpeed + p.phase) + 1) / 2;

      const alpha = Math.min(
        1,
        p.opacity * this.opacity * (0.35 + wave * 0.65),
      );

      this.drawGlow(ctx, p, alpha, color);

      ctx.globalAlpha = alpha;

      ctx.fillStyle = color;

      ctx.beginPath();

      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

      ctx.fill();

      // Tiny white core.
      ctx.globalAlpha = alpha * 0.9;

      ctx.fillStyle = "#FFFFFF";

      ctx.beginPath();

      ctx.arc(
        p.x - p.radius * 0.2,
        p.y - p.radius * 0.2,
        Math.max(0.4, p.radius * 0.3),
        0,
        Math.PI * 2,
      );

      ctx.fill();

      ctx.globalAlpha = 1;
    }

    // =========================
    // DRAW FOUR POINT STAR
    // =========================

    drawStar(ctx, p, time) {
      if (!this.sparklesEnabled) return;

      const wave = (Math.sin(time * p.twinkleSpeed + p.phase) + 1) / 2;

      const alpha = Math.min(1, p.opacity * this.opacity * wave);

      if (alpha < 0.08) return;

      const s = p.starSize * (0.55 + wave * 0.65);

      const palette = this.getPalette();

      const color = palette[p.colorIndex % palette.length];

      ctx.save();

      ctx.translate(p.x, p.y);

      ctx.rotate(p.rotation);

      ctx.globalAlpha = alpha;

      // Star glow.
      ctx.shadowColor = color;

      ctx.shadowBlur = 12 * this.glow;

      ctx.fillStyle = color;

      ctx.beginPath();

      ctx.moveTo(0, -s * 1.8);

      ctx.quadraticCurveTo(s * 0.2, -s * 0.2, s, 0);

      ctx.quadraticCurveTo(s * 0.2, s * 0.2, 0, s * 1.8);

      ctx.quadraticCurveTo(-s * 0.2, s * 0.2, -s, 0);

      ctx.quadraticCurveTo(-s * 0.2, -s * 0.2, 0, -s * 1.8);

      ctx.closePath();

      ctx.fill();

      // Cross sparkle.
      ctx.shadowBlur = 0;

      ctx.strokeStyle = "#FFFFFF";

      ctx.lineWidth = 0.6;

      ctx.beginPath();

      ctx.moveTo(-s * 1.5, 0);
      ctx.lineTo(s * 1.5, 0);

      ctx.moveTo(0, -s * 1.5);
      ctx.lineTo(0, s * 1.5);

      ctx.stroke();

      ctx.restore();

      ctx.globalAlpha = 1;
    }

    // =========================
    // UPDATE
    // =========================

    updateParticles(delta, time) {
      const factor = delta / 16.67;

      for (const p of this.particles) {
        const wave = Math.sin(time * 0.001 * p.frequency + p.phase);

        p.x += (this.wind * 0.5 + p.drift + wave * 0.35) * factor * p.depth;

        p.y -= p.speed * this.speed * factor;

        p.phase += 0.002 * factor;

        p.rotation += p.rotationSpeed * factor;

        if (p.y < -30) {
          Object.assign(p, this.createParticle(false));

          p.y = this.height + 20;
        }

        if (p.x > this.width + 20) {
          p.x = -20;
        }

        if (p.x < -20) {
          p.x = this.width + 20;
        }
      }
    }

    // =========================
    // RENDER
    // =========================

    render(time) {
      const ctx = this.ctx;

      ctx.clearRect(0, 0, this.width, this.height);

      const sorted = [...this.particles].sort((a, b) => a.depth - b.depth);

      for (const p of sorted) {
        this.drawParticle(ctx, p, time);

        if (p.isStar) {
          this.drawStar(ctx, p, time);
        }
      }

      ctx.globalAlpha = 1;
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

      this.updateParticles(delta, timestamp);

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

      this.particles = [];

      this.ctx?.clearRect(0, 0, this.width, this.height);

      this.destroyed = true;
    }
  }

  // =========================
  // REGISTER CUSTOM ELEMENT
  // =========================

  customElements.define("magic-particles", MagicParticles);
})();
