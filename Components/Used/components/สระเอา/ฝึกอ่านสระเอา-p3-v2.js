class ThaiReadingPhrases2 extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.wordsData = [
      { word: "เกาขา", audio: "" },
      { word: "เดาใจ", audio: "" },
      { word: "เตาไฟ", audio: "" },
      { word: "เอามา", audio: "" },
      { word: "สะเดา", audio: "" },
      { word: "มีเหา", audio: "" },
      { word: "เผาไฟ", audio: "" },
      { word: "เสาผุ", audio: "" },
      { word: "ใบเฉา", audio: "" },
      { word: "โคมีเขา", audio: "" },
      { word: "เมาโซเซ", audio: "" },
      { word: "เงาสีดำ", audio: "" },
    ];
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  playAudio(src, card) {
    if (!src) return;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;

      if (this.currentCard) {
        this.currentCard.classList.remove("playing");
      }
    }

    this.currentAudio = new Audio(src);
    this.currentCard = card;

    card.classList.add("playing");

    this.currentAudio.addEventListener("ended", () => {
      card.classList.remove("playing");
      this.currentAudio = null;
      this.currentCard = null;
    });

    this.currentAudio.addEventListener("error", () => {
      card.classList.remove("playing");
      this.currentAudio = null;
      this.currentCard = null;
    });

    this.currentAudio.play().catch((error) => {
      console.warn("ไม่สามารถเล่นไฟล์เสียงได้:", error);

      card.classList.remove("playing");
      this.currentAudio = null;
      this.currentCard = null;
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          min-width: 0;
          margin: 0;
          padding: 0;
          box-sizing: border-box;

          --primary: #7356a5;
          --primary-light: #a18bd3;
          --text-color: #52647c;
        }

        * {
          box-sizing: border-box;
        }

        /* =========================
           GLASS CONTAINER
        ========================= */

        .book-container {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          width: 100%;
          min-width: 0;

          padding: clamp(14px, 3vw, 24px);

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.82),
              rgba(255,255,255,0.52)
            );

          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 22px;

          box-shadow:
            0 8px 30px rgba(70,85,130,0.09),
            inset 0 1px 1px rgba(255,255,255,0.95);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .book-container::before {
          content: "";

          position: absolute;
          z-index: -1;

          width: 180px;
          height: 180px;

          top: -110px;
          right: -50px;

          background: rgba(161,139,211,0.16);

          filter: blur(35px);
          border-radius: 50%;

          pointer-events: none;
        }

        /* =========================
           GRID
        ========================= */

        .grid-container {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: clamp(9px, 2vw, 15px);

          width: 100%;

          justify-items: stretch;
          align-items: stretch;
        }

        /* =========================
           WORD CARD
        ========================= */

        .word-card {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-direction: column;
          gap: 7px;

          width: 100%;
          min-width: 0;
          min-height: 76px;

          padding: 10px 4px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.96),
              rgba(245,242,255,0.72)
            );

          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 16px;

          box-shadow:
            0 5px 14px rgba(80,90,130,0.07),
            inset 0 1px 1px rgba(255,255,255,0.95);

          cursor: pointer;
          user-select: none;

          -webkit-tap-highlight-color: transparent;

          transition:
            transform .22s ease,
            box-shadow .22s ease,
            background .22s ease,
            border-color .22s ease;

          font-family: inherit;
        }

        .word-card:hover:not(:disabled) {
          transform: translateY(-4px);

          border-color: rgba(161,139,211,0.5);

          box-shadow:
            0 10px 22px rgba(115,86,165,0.13),
            inset 0 1px 1px white;
        }

        .word-card:active:not(:disabled) {
          transform: scale(.94);
        }

        .word-card:focus-visible {
          outline: 3px solid rgba(115,86,165,.45);
          outline-offset: 3px;
        }

        .word-card:disabled {
          cursor: default;
        }

        /* =========================
           WORD TEXT
        ========================= */

        .word-text {
          font-size: clamp(1.2rem, 3.5vw, 1.8rem);

          font-weight: 800;

          color: var(--primary);

          white-space: nowrap;
          line-height: 1.3;
        }

        /* =========================
           AUDIO ICON
        ========================= */

        .audio-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 27px;
          height: 27px;

          border-radius: 50%;

          background: rgba(161,139,211,0.14);

          color: var(--primary);

          font-size: 12px;

          transition:
            background .2s ease,
            transform .2s ease;
        }

        .word-card:disabled .audio-icon {
          opacity: .25;
        }

        .word-card:hover:not(:disabled) .audio-icon {
          background: rgba(161,139,211,0.25);
          transform: scale(1.08);
        }

        /* =========================
           PLAYING STATE
        ========================= */

        .word-card.playing {
          background: rgba(235,228,255,.95);

          border-color: var(--primary-light);

          box-shadow:
            0 0 0 3px rgba(115,86,165,.10),
            0 7px 18px rgba(115,86,165,.15);

          transform: translateY(-3px);
        }

        .word-card.playing .audio-icon {
          background: var(--primary);
          color: white;

          animation: soundPulse .7s ease-in-out infinite alternate;
        }

        @keyframes soundPulse {
          from {
            transform: scale(.85);
            opacity: .6;
          }

          to {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 320px) {
          .grid-container {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .word-card {
            min-height: 68px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .word-card,
          .audio-icon {
            transition: none;
            animation: none;
          }
        }
      </style>

      <div class="book-container">

        <div class="grid-container">

          ${this.wordsData
            .map(
              (item, index) => `
            <button
              type="button"
              class="word-card"
              data-index="${index}"
              aria-label="เล่นเสียง ${this.escapeHTML(item.word)}"
              ${item.audio ? "" : "disabled"}
            >

              <span class="word-text">
                ${this.escapeHTML(item.word)}
              </span>

              <span class="audio-icon" aria-hidden="true">
                🔊
              </span>

            </button>
          `,
            )
            .join("")}

        </div>

      </div>
    `;
  }

  escapeHTML(value) {
    return String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  }

  bindEvents() {
    const cards = this.shadowRoot.querySelectorAll(".word-card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const index = Number(card.dataset.index);
        const item = this.wordsData[index];

        this.playAudio(item.audio, card);
      });
    });
  }

  disconnectedCallback() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    this.currentCard = null;
  }
}

if (!customElements.get("thai-reading-phrases2")) {
  customElements.define("thai-reading-phrases2", ThaiReadingPhrases2);
}
