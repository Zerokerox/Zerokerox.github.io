class WinterEffect extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        :host {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: block;
          pointer-events: none;
          overflow: hidden;
        }

        * {
          box-sizing: border-box;
        }

        .layer {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        /* Snow particles */
        .snow {
          position: absolute;
          top: -30px;
          color: #68bce8;
          user-select: none;
          will-change: transform;

          text-shadow:
            0 0 3px rgba(25,130,200,.55),
            0 0 9px rgba(70,175,230,.45);

          animation: fall linear infinite;
        }

        /* Small ice particles */
        .ice {
          position: absolute;
          border-radius: 50%;
          background: #55b9ed;

          box-shadow:
            0 0 4px rgba(0,125,210,.65),
            0 0 10px rgba(70,185,240,.45);

          animation: iceFloat linear infinite;
        }

        /* Sparkles */
        .glow {
          position: absolute;
          border-radius: 50%;

          background: #269bd8;

          box-shadow:
            0 0 4px #fff,
            0 0 9px #66c9ff,
            0 0 17px rgba(40,150,220,.8);

          animation: sparkle ease-in-out infinite alternate;
        }

        /* Soft winter atmosphere */
        .aurora {
          position: absolute;
          inset: -20%;

          opacity: .16;

          background:
            radial-gradient(
              ellipse at 15% 15%,
              rgba(85,185,235,.22),
              transparent 45%
            ),
            radial-gradient(
              ellipse at 85% 25%,
              rgba(100,200,240,.18),
              transparent 45%
            ),
            radial-gradient(
              ellipse at 50% 90%,
              rgba(120,190,230,.13),
              transparent 50%
            );

          animation: aurora 12s ease-in-out infinite alternate;
        }

        @keyframes fall {
          0% {
            transform: translate3d(0,-5vh,0) rotate(0deg);
          }

          100% {
            transform:
              translate3d(var(--drift),110vh,0)
              rotate(var(--rotate));
          }
        }

        @keyframes iceFloat {
          0% {
            transform: translate3d(0,-5vh,0);
            opacity: 0;
          }

          15% {
            opacity: .65;
          }

          85% {
            opacity: .65;
          }

          100% {
            transform: translate3d(var(--drift),110vh,0);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          from {
            opacity: .15;
            transform: scale(.6);
          }

          to {
            opacity: .9;
            transform: scale(1.5);
          }
        }

        @keyframes aurora {
          from {
            transform: translateX(-3%) scale(1);
          }

          to {
            transform: translateX(3%) scale(1.1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .snow, .ice, .glow, .aurora {
            animation-play-state: paused;
          }
        }
      </style>

      <div class="layer">
        <div class="aurora"></div>
        <div class="snow-layer"></div>
        <div class="ice-layer"></div>
        <div class="glow-layer"></div>
      </div>
    `;

    this.shadow = shadow;
  }

  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;

    const snowLayer = this.shadow.querySelector(".snow-layer");

    const iceLayer = this.shadow.querySelector(".ice-layer");

    const glowLayer = this.shadow.querySelector(".glow-layer");

    const isMobile = window.innerWidth < 600;

    // Snow
    const snowCount = isMobile ? 45 : 100;

    const symbols = ["❄", "❅", "❆", "✻"];

    for (let i = 0; i < snowCount; i++) {
      const snow = document.createElement("span");

      snow.className = "snow";

      snow.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      const size = 7 + Math.random() * 12;

      snow.style.left = Math.random() * 100 + "vw";
      snow.style.fontSize = size + "px";

      snow.style.opacity = 0.35 + Math.random() * 0.6;

      snow.style.animationDuration = 7 + Math.random() * 14 + "s";

      snow.style.animationDelay = -Math.random() * 20 + "s";

      snow.style.setProperty("--drift", Math.random() * 160 - 80 + "px");

      snow.style.setProperty("--rotate", Math.random() * 500 - 250 + "deg");

      snowLayer.appendChild(snow);
    }

    // Ice particles
    const iceCount = isMobile ? 30 : 65;

    for (let i = 0; i < iceCount; i++) {
      const ice = document.createElement("span");

      ice.className = "ice";

      const size = 2 + Math.random() * 3;

      ice.style.width = size + "px";
      ice.style.height = size + "px";

      ice.style.left = Math.random() * 100 + "vw";
      ice.style.top = "-10px";

      ice.style.animationDuration = 9 + Math.random() * 15 + "s";

      ice.style.animationDelay = -Math.random() * 20 + "s";

      ice.style.setProperty("--drift", Math.random() * 120 - 60 + "px");

      iceLayer.appendChild(ice);
    }

    // Sparkles
    const glowCount = isMobile ? 20 : 35;

    for (let i = 0; i < glowCount; i++) {
      const glow = document.createElement("span");

      glow.className = "glow";

      const size = 2 + Math.random() * 3;

      glow.style.width = size + "px";
      glow.style.height = size + "px";

      glow.style.left = Math.random() * 100 + "vw";
      glow.style.top = Math.random() * 100 + "vh";

      glow.style.animationDuration = 2 + Math.random() * 4 + "s";

      glow.style.animationDelay = Math.random() * 4 + "s";

      glowLayer.appendChild(glow);
    }
  }
}

if (!customElements.get("winter-effect")) {
  customElements.define("winter-effect", WinterEffect);
}
