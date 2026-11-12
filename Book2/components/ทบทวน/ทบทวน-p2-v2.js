class ThaiReadingPhrases extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.imagesData = [
      {
        word: "ทาสี",
        image:
          "https://th.bing.com/th/id/OIP.gN8GncE-T3cN7COxqxjRmgHaHa?w=192&h=192&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ฝากา",
        image:
          "https://th.bing.com/th/id/OIP.hZZ9xyGcYhMiF8uUNgPdHgHaHa?w=216&h=216&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "รูหู",
        image:
          "data:image/webp;base64,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",
        audio: "",
      },
      {
        word: "ปูขาเก",
        image:
          "https://th.bing.com/th/id/OIP.-8axHur6gJ-iukkLdCSitgHaHa?w=188&h=188&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "งูดุ",
        image:
          "https://th.bing.com/th/id/OIP.GIaODnF3C1zz83ZOQULLOwHaHa?w=174&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "โถใบโต",
        image:
          "https://th.bing.com/th/id/OIP.QFXqP2NDaMny0weS2wFGawHaHa?w=199&h=199&c=7&r=0&o=7&pid=1.7&rm=3",
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
