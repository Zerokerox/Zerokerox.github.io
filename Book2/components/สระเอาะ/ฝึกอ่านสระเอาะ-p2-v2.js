class ThaiReadingPhrases extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.imagesData = [
      {
        word: "เงาะ",
        image:
          "https://hdmall.co.th/blog/wp-content/uploads/2024/04/%E0%B9%80%E0%B8%87%E0%B8%B2%E0%B8%B0-Rambutan-scaled.jpg",
        audio: "",
      },
      {
        word: "เบาะ",
        image:
          "data:image/webp;base64,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",
        audio: "",
      },
      {
        word: "เจาะรู",
        image:
          "https://www.bing.com/images/search?view=detailV2&ccid=INfmzmJU&id=AF6455B88B653D5C12980BF32B98089F7185F68C&thid=OIP.INfmzmJUpzxd2tD3ZNP-9AHaHa&mediaurl=https%3a%2f%2fdown-th.img.susercontent.com%2ffile%2fsg-11134201-824i8-mejxo3x0hssgca&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.20d7e6ce6254a73c5ddad0f764d3fef4%3frik%3djPaFcZ8ImCvzCw%26pid%3dImgRaw%26r%3d0&exph=1024&expw=1024&q=%e0%b9%80%e0%b8%88%e0%b8%b2%e0%b8%b0%e0%b8%a3%e0%b8%b9&FORM=IRPRST&ck=8053EECDC1E31A057C733F246CB245B6&selectedIndex=72&itb=0",
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
