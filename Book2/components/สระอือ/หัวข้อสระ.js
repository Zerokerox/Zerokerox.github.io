class ThaiSaraTitle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  playAudio(src) {
    if (!src) return;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    this.currentAudio = new Audio(src);

    this.currentAudio.play().catch((error) => {
      console.warn("ไม่สามารถเล่นไฟล์เสียงได้:", error);
    });
  }

  render() {
    const headerAudio = this.getAttribute("header-audio") || "";

    const sara = this.getAttribute("sara") || "ู";
    const saraName = this.getAttribute("sara-name") || "สระอู";
    const example = this.getAttribute("example") || "งู";
    const reading = this.getAttribute("reading") || "งอ อู งู";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          min-width: 0;
          margin: 0;
          box-sizing: border-box;
        }

        * {
          box-sizing: border-box;
        }

        .book-container {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          width: 100%;
          padding: clamp(18px, 4vw, 28px);

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.82),
              rgba(255,255,255,0.48)
            );

          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 24px;

          box-shadow:
            0 8px 32px rgba(55, 75, 120, 0.12),
            inset 0 1px 1px rgba(255,255,255,0.9);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        /* Decorative gradient */
        .book-container::before {
          content: "";
          position: absolute;
          z-index: -1;

          width: 180px;
          height: 180px;

          top: -90px;
          right: -60px;

          background: rgba(155, 180, 255, 0.22);
          filter: blur(35px);
          border-radius: 50%;
        }

        .book-container::after {
          content: "";
          position: absolute;
          z-index: -1;

          width: 160px;
          height: 160px;

          bottom: -100px;
          left: -50px;

          background: rgba(255, 190, 210, 0.25);
          filter: blur(35px);
          border-radius: 50%;
        }

        .header-box {
          position: relative;
          text-align: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.9),
              rgba(238,231,255,0.75)
            );

          color: #7356a5;

          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 800;

          padding: 10px 34px;
          border-radius: 50px;

          border: 1px solid rgba(255,255,255,0.95);

          box-shadow:
            0 5px 18px rgba(115,86,165,0.12),
            inset 0 1px 2px rgba(255,255,255,0.9);

          margin-bottom: 16px;
        }

        .sub-title {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #52647c;
          margin: 6px 0;
          font-weight: 500;
        }

        .highlight {
          color: #7356a5;
          font-weight: 800;
        }

        .main-example {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;

          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 800;

          color: #d45c75;
          margin-top: 16px;
        }

        .reading {
          color: #52647c;
          font-weight: 500;
          font-size: 0.65em;
        }

        .audio-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          width: 42px;
          height: 42px;

          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 50%;

          cursor: pointer;
          font-size: 1.2rem;

          box-shadow: 0 4px 12px rgba(80,90,130,0.12);

          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .audio-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.95);
          transform: scale(1.1);

          box-shadow: 0 6px 18px rgba(115,86,165,0.2);
        }

        .audio-btn:active:not(:disabled) {
          transform: scale(0.94);
        }

        .audio-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .audio-btn:focus-visible {
          outline: 3px solid #8b72c4;
          outline-offset: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .audio-btn {
            transition: none;
          }
        }
      </style>

      <div class="book-container">
        <div class="header-box">

          <div class="badge">
            สระ ${sara}
          </div>

          <div class="sub-title">
            อ่านว่า <span class="highlight">${saraName}</span>
          </div>

          <div class="main-example">
            ${example}

            <span class="reading">
              อ่านว่า ${reading}
            </span>

            <button
              class="audio-btn"
              id="play-header"
              aria-label="เล่นเสียง ${example}"
              ${headerAudio ? "" : "disabled"}
            >🔊</button>

          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.shadowRoot
      .querySelector("#play-header")
      .addEventListener("click", () => {
        this.playAudio(this.getAttribute("header-audio") || "");
      });
  }

  disconnectedCallback() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }
}

if (!customElements.get("thai-sara-title")) {
  customElements.define("thai-sara-title", ThaiSaraTitle);
}
