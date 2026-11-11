class ThaiReadingPhrases extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.imagesData = [
      {
        word: "ภูเขา",
        image:
          "https://th.bing.com/th/id/OIP.UfCslEMJfgfcxc21W8W6ogHaE7?w=265&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "เหา",
        image:
          "https://th.bing.com/th/id/OIP.fTO2CgtHpEnNAHfTpAmSLAHaEc?w=300&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "สีเทา",
        image:
          "https://th.bing.com/th/id/OIP.r2arkn9fIqqJL3lrFI3xEgHaE8?w=269&h=189&c=7&r=0&o=7&pid=1.7&rm=3",
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
