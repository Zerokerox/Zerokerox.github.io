// the most useful version
class ThaiReadingPractice extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.wordsData = [];
  }

  connectedCallback() {
    this.loadWords();
    this.render();
    this.bindEvents();
  }

  loadWords() {
    try {
      this.wordsData = JSON.parse(this.getAttribute("words") || "[]");
    } catch (error) {
      console.error("ข้อมูลคำศัพท์ไม่ถูกต้อง:", error);
      this.wordsData = [];
    }
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
          --vowel-color: #d45c75;
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

          padding: clamp(16px, 3vw, 24px);

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

          top: -100px;
          right: -50px;

          background: rgba(161,139,211,0.17);
          filter: blur(35px);
          border-radius: 50%;
          pointer-events: none;
        }

        /* =========================
           HEADER
        ========================= */

        .header-box {
          text-align: center;
          margin-bottom: 22px;
        }

        .title {
          display: inline-block;

          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 800;

          color: var(--primary);

          margin: 0;
        }

        .subtitle {
          color: #8390a5;
          font-size: 0.9rem;
          margin-top: 7px;
        }

        /* =========================
           WORD GRID
        ========================= */

        .grid-container {
          display: grid;

          grid-template-columns:
            repeat(5, minmax(0, 1fr));

          gap: clamp(8px, 1.5vw, 14px);

          width: 100%;
          padding: 5px 0;
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
              rgba(255,255,255,0.95),
              rgba(245,242,255,0.72)
            );

          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 15px;

          box-shadow:
            0 4px 12px rgba(80,90,130,0.07),
            inset 0 1px 1px rgba(255,255,255,0.95);

          cursor: pointer;
          user-select: none;

          -webkit-tap-highlight-color: transparent;

          transition:
            transform .2s ease,
            box-shadow .2s ease,
            background .2s ease,
            border-color .2s ease;
        }

        .word-card:hover:not(:disabled) {
          transform: translateY(-4px);

          background: rgba(255,255,255,0.98);

          border-color: rgba(161,139,211,0.45);

          box-shadow:
            0 9px 20px rgba(115,86,165,0.13),
            inset 0 1px 1px rgba(255,255,255,1);
        }

        .word-card:active:not(:disabled) {
          transform: scale(0.94);
        }

        .word-card:focus-visible {
          outline: 3px solid rgba(115,86,165,0.45);
          outline-offset: 3px;
        }

        .word-card:disabled {
          cursor: default;
          opacity: 0.9;
        }

        /* =========================
           WORD TEXT
        ========================= */

        .word-text {
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 800;

          line-height: 1.2;
          white-space: nowrap;
        }

        .char-consonant {
          color: #52647c;
        }

        .char-vowel {
          color: var(--vowel-color);
        }

        /* =========================
           AUDIO ICON
        ========================= */

        .audio-icon {
          font-size: 12px;
          color: #a18bd3;
          line-height: 1;
          opacity: 0.8;
        }

        .word-card:disabled .audio-icon {
          opacity: 0.2;
        }

        /* Playing animation */

        .word-card.playing {
          background: rgba(235,228,255,0.95);

          border-color: var(--primary-light);

          box-shadow:
            0 0 0 3px rgba(115,86,165,0.10),
            0 6px 18px rgba(115,86,165,0.15);

          transform: translateY(-3px);
        }

        .word-card.playing .audio-icon {
          opacity: 1;
          animation: soundPulse .7s ease-in-out infinite alternate;
        }

        @keyframes soundPulse {
          from {
            transform: scale(0.85);
            opacity: 0.5;
          }

          to {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 600px) {
          .grid-container {
            grid-template-columns:
              repeat(4, minmax(0, 1fr));
          }

          .word-card {
            min-height: 68px;
          }
        }

        @media (max-width: 320px) {
          .grid-container {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .word-card,
          .word-card.playing .audio-icon {
            animation: none;
            transition: none;
          }
        }
      </style>

      <div class="book-container">
        <div class="grid-container">

          ${this.wordsData
            .map((item, index) => {
              const consonant = item.word[0];
              const vowel = item.word.slice(1);

              return `
              <button
                type="button"
                class="word-card"
                data-index="${index}"
                aria-label="เล่นเสียง ${item.word}"
                ${item.audio ? "" : "disabled"}
              >
                <span class="word-text">
                  <span class="char-consonant">${consonant}</span><span class="char-vowel">${vowel}</span>
                </span>

                <span class="audio-icon" aria-hidden="true">
                  🔊
                </span>
              </button>
            `;
            })
            .join("")}

        </div>
      </div>
    `;
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

if (!customElements.get("thai-reading-practice")) {
  customElements.define("thai-reading-practice", ThaiReadingPractice);
}
