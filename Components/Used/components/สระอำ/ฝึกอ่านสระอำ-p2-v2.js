class ThaiReadingPhrases extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.imagesData = [
      {
        word: "ตำรา",
        image:
          "https://th.bing.com/th/id/OIP.iy3dHhtbhbLXGzWHF7pgMwHaJ4?w=137&h=184&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ระบำ",
        image:
          "data:image/webp;base64,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",
        audio: "",
      },
      {
        word: "ทำนา",
        image:
          "https://th.bing.com/th/id/OIP.tzQzY8Ee8X-n5_tCpe8uHgHaEH?w=315&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "กำไล",
        image:
          "https://th.bing.com/th/id/OIP.t58erOsutFfLObYldDBPWAHaHa?w=165&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ลำไย",
        image:
          "data:image/webp;base64,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",
        audio: "",
      },
      {
        word: "จำปี",
        image:
          "https://th.bing.com/th/id/OIP.bJQi272Vq7Gmpvjr-nTezwHaHa?w=181&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
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

        /* =========================
           IMAGE GRID
        ========================= */

        .top-images-grid {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: clamp(10px, 2vw, 18px);

          width: 100%;
        }

        /* =========================
           IMAGE CARD
        ========================= */

        .image-card {
          display: flex;
          flex-direction: column;
          align-items: center;

          min-width: 0;
          width: 100%;

          padding: clamp(8px, 2vw, 14px);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.96),
              rgba(245,242,255,0.72)
            );

          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 18px;

          box-shadow:
            0 5px 16px rgba(80,90,130,0.07),
            inset 0 1px 1px rgba(255,255,255,0.95);

          cursor: pointer;
          user-select: none;

          -webkit-tap-highlight-color: transparent;

          transition:
            transform .25s ease,
            box-shadow .25s ease,
            border-color .25s ease;

          font-family: inherit;
        }

        .image-card:hover:not(:disabled) {
          transform: translateY(-5px);

          border-color: rgba(161,139,211,0.5);

          box-shadow:
            0 12px 24px rgba(115,86,165,0.13),
            inset 0 1px 1px white;
        }

        .image-card:active:not(:disabled) {
          transform: scale(.96);
        }

        .image-card:focus-visible {
          outline: 3px solid rgba(115,86,165,.45);
          outline-offset: 3px;
        }

        .image-card:disabled {
          cursor: default;
        }

        /* =========================
           IMAGE
        ========================= */

        .image-wrapper {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          aspect-ratio: 1 / 1;

          overflow: hidden;

          border-radius: 13px;

          background: #f1eff8;

          margin-bottom: 12px;
        }

        .img-icon {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;

          border-radius: 13px;

          transition: transform .35s ease;
        }

        .image-card:hover:not(:disabled) .img-icon {
          transform: scale(1.08);
        }

        /* =========================
           WORD TEXT
        ========================= */

        .img-text {
          display: block;

          font-size: clamp(1rem, 2.8vw, 1.4rem);
          font-weight: 800;

          color: var(--primary);

          text-align: center;

          margin-bottom: 8px;
        }

        /* =========================
           AUDIO ICON
        ========================= */

        .audio-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 30px;
          height: 30px;

          border-radius: 50%;

          background: rgba(161,139,211,0.13);

          color: var(--primary);

          font-size: 14px;

          transition:
            background .2s ease,
            transform .2s ease;
        }

        .image-card:hover:not(:disabled) .audio-icon {
          background: rgba(161,139,211,0.25);
          transform: scale(1.08);
        }

        .image-card:disabled .audio-icon {
          opacity: .25;
        }

        /* =========================
           PLAYING STATE
        ========================= */

        .image-card.playing {
          border-color: var(--primary-light);

          background: rgba(235,228,255,.95);

          box-shadow:
            0 0 0 3px rgba(115,86,165,.10),
            0 8px 20px rgba(115,86,165,.15);

          transform: translateY(-3px);
        }

        .image-card.playing .audio-icon {
          background: var(--primary);
          color: white;

          animation: soundPulse .7s infinite alternate;
        }

        @keyframes soundPulse {
          from {
            transform: scale(.9);
          }

          to {
            transform: scale(1.2);
          }
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 480px) {
          .top-images-grid {
            gap: 9px;
          }

          .image-card {
            padding: 7px;
            border-radius: 14px;
          }

          .image-wrapper {
            border-radius: 10px;
            margin-bottom: 8px;
          }

          .img-text {
            font-size: 1rem;
          }
        }

        @media (max-width: 280px) {
          .top-images-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .image-card,
          .img-icon,
          .audio-icon {
            transition: none;
            animation: none;
          }
        }
      </style>

      <div class="book-container">

        <div class="top-images-grid">

          ${this.imagesData
            .map(
              (item, index) => `
            <button
              type="button"
              class="image-card"
              data-index="${index}"
              aria-label="เล่นเสียง ${this.escapeHTML(item.word)}"
              ${item.audio ? "" : "disabled"}
            >

              <div class="image-wrapper">
                <img
                  class="img-icon"
                  src="${this.escapeHTML(item.image)}"
                  alt="${this.escapeHTML(item.word)}"
                  loading="lazy"
                >
              </div>

              <span class="img-text">
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
    const cards = this.shadowRoot.querySelectorAll(".image-card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const index = Number(card.dataset.index);
        const item = this.imagesData[index];

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

if (!customElements.get("thai-reading-phrases")) {
  customElements.define("thai-reading-phrases", ThaiReadingPhrases);
}
