class ImageAudioCards extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.cardsData = [];

    this.currentAudio = null;
    this.currentButton = null;

    // Event Delegation
    this.shadowRoot.addEventListener("click", (event) => {
      const button = event.target.closest(".text-button");

      if (!button || button.disabled) return;

      const cardIndex = Number(button.dataset.cardIndex);
      const textIndex = Number(button.dataset.textIndex);

      const item = this.cardsData[cardIndex]?.texts?.[textIndex];

      if (!item) return;

      this.playAudio(item.audio, button);
    });
  }

  // =========================================
  // LIFECYCLE
  // =========================================

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.stopAudio();
  }

  // =========================================
  // DATA
  // =========================================

  set data(value) {
    this.cardsData = Array.isArray(value) ? value : [];

    this.render();
  }

  get data() {
    return this.cardsData;
  }

  // =========================================
  // AUDIO
  // =========================================

  playAudio(src, button) {
    if (!src) return;

    // Stop previous audio
    this.stopAudio();

    this.currentAudio = new Audio(src);
    this.currentButton = button;

    button.classList.add("playing");

    const audio = this.currentAudio;

    const cleanup = () => {
      if (this.currentAudio !== audio) return;

      button.classList.remove("playing");

      this.currentAudio = null;
      this.currentButton = null;
    };

    audio.addEventListener("ended", cleanup, { once: true });

    audio.addEventListener("error", cleanup, { once: true });

    audio.play().catch((error) => {
      console.warn("ไม่สามารถเล่นไฟล์เสียงได้:", error);

      cleanup();
    });
  }

  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    if (this.currentButton) {
      this.currentButton.classList.remove("playing");
    }

    this.currentAudio = null;
    this.currentButton = null;
  }

  // =========================================
  // HTML ESCAPE
  // =========================================

  escapeHTML(value) {
    return String(value ?? "").replace(
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

  // =========================================
  // RENDER
  // =========================================

  render() {
    this.shadowRoot.innerHTML = `
      <style>

        :host {
          display: block;
          width: 100%;
          min-width: 0;

          --primary: #7356a5;
          --primary-light: #a18bd3;
          --text-color: #52647c;
        }

        * {
          box-sizing: border-box;
        }

        /* =================================
           GLASS CONTAINER
        ================================= */

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

        /* =================================
           GRID
        ================================= */

        .grid-container {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: clamp(10px, 2vw, 16px);

          width: 100%;

          align-items: stretch;
        }

        /* =================================
           IMAGE CARD
        ================================= */

        .image-card {
          display: flex;
          flex-direction: column;

          min-width: 0;
          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.96),
              rgba(245,242,255,0.72)
            );

          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 17px;

          box-shadow:
            0 5px 14px rgba(80,90,130,0.07),
            inset 0 1px 1px rgba(255,255,255,0.95);

          transition:
            transform .22s ease,
            box-shadow .22s ease,
            border-color .22s ease;
        }

        .image-card:hover {
          transform: translateY(-3px);

          border-color: rgba(161,139,211,0.5);

          box-shadow:
            0 10px 22px rgba(115,86,165,0.13),
            inset 0 1px 1px white;
        }

        /* =================================
           IMAGE
        ================================= */

        .image-wrapper {
          position: relative;

          width: 100%;
          aspect-ratio: 4 / 3;

          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              rgba(235,228,255,.8),
              rgba(255,255,255,.9)
            );
        }

        .card-image {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;

          transition: transform .35s ease;
        }

        .image-card:hover .card-image {
          transform: scale(1.04);
        }

        .image-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          height: 100%;

          color: var(--primary-light);
          font-size: 2rem;
        }

        /* =================================
           TEXT CONTAINER
        ================================= */

        .text-container {
          display: flex;
          flex-direction: column;

          gap: 7px;

          width: 100%;
          min-width: 0;

          padding: 10px;
        }

        /* =================================
           TEXT BUTTON
        ================================= */

        .text-button {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 7px;

          width: 100%;
          min-width: 0;

          padding: 9px 10px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.96),
              rgba(245,242,255,0.72)
            );

          border: 1px solid rgba(161,139,211,0.12);
          border-radius: 11px;

          color: var(--primary);

          font-family: inherit;
          font-size: clamp(0.9rem, 2.5vw, 1.15rem);
          font-weight: 800;

          text-align: left;

          cursor: pointer;
          user-select: none;

          -webkit-tap-highlight-color: transparent;

          transition:
            transform .2s ease,
            background .2s ease,
            border-color .2s ease,
            box-shadow .2s ease;
        }

        .text-button:hover:not(:disabled) {
          background: rgba(235,228,255,.75);

          border-color: rgba(161,139,211,.5);

          transform: translateX(2px);
        }

        .text-button:active:not(:disabled) {
          transform: scale(.96);
        }

        .text-button:focus-visible {
          outline: 3px solid rgba(115,86,165,.4);
          outline-offset: 2px;
        }

        .text-button:disabled {
          cursor: default;
          opacity: .55;
        }

        .text-label {
          min-width: 0;

          white-space: normal;
          overflow-wrap: anywhere;

          line-height: 1.5;
        }

        /* =================================
           AUDIO ICON
        ================================= */

        .audio-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          flex: 0 0 27px;

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

        .text-button:hover:not(:disabled) .audio-icon {
          background: rgba(161,139,211,0.25);

          transform: scale(1.08);
        }

        /* =================================
           PLAYING STATE
        ================================= */

        .text-button.playing {
          background: rgba(235,228,255,.95);

          border-color: var(--primary-light);

          box-shadow:
            0 0 0 3px rgba(115,86,165,.10),
            0 5px 14px rgba(115,86,165,.12);
        }

        .text-button.playing .audio-icon {
          background: var(--primary);

          color: white;

          animation:
            soundPulse .7s ease-in-out infinite alternate;
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

        /* =================================
           EMPTY STATE
        ================================= */

        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;

          min-height: 120px;

          color: var(--text-color);

          font-size: 1rem;
          font-weight: 600;

          text-align: center;
        }

        /* =================================
           RESPONSIVE
        ================================= */

        @media (max-width: 600px) {
          .grid-container {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 320px) {
          .grid-container {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .text-container {
            padding: 7px;
          }

          .text-button {
            padding: 8px 7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            transition: none !important;
            animation: none !important;
          }
        }

      </style>

      <div class="book-container">

        <div class="grid-container">

          ${
            this.cardsData.length
              ? this.cardsData
                  .map(
                    (card, cardIndex) => `

                <div class="image-card">

                  <div class="image-wrapper">

                    ${
                      card.image
                        ? `
                          <img
                            class="card-image"
                            src="${this.escapeHTML(card.image)}"
                            alt="${this.escapeHTML(card.imageAlt || "")}"
                            loading="lazy"
                          >
                        `
                        : `
                          <div class="image-placeholder">
                            🖼️
                          </div>
                        `
                    }

                  </div>

                  <div class="text-container">

                    ${
                      Array.isArray(card.texts)
                        ? card.texts
                            .map(
                              (item, textIndex) => `

                          <button
                            type="button"
                            class="text-button"

                            data-card-index="${cardIndex}"
                            data-text-index="${textIndex}"

                            aria-label="เล่นเสียง ${this.escapeHTML(item.text)}"

                            ${item.audio ? "" : "disabled"}
                          >

                            <span class="text-label">
                              ${this.escapeHTML(item.text)}
                            </span>

                            <span
                              class="audio-icon"
                              aria-hidden="true"
                            >
                              🔊
                            </span>

                          </button>

                        `,
                            )
                            .join("")
                        : ""
                    }

                  </div>

                </div>

              `,
                  )
                  .join("")
              : `
                <div class="empty-state">
                  ยังไม่มีข้อมูล
                </div>
              `
          }

        </div>

      </div>
    `;

    // Image error handling
    this.shadowRoot.querySelectorAll(".card-image").forEach((img) => {
      img.addEventListener(
        "error",
        () => {
          const placeholder = document.createElement("div");

          placeholder.className = "image-placeholder";
          placeholder.textContent = "🖼️";

          img.replaceWith(placeholder);
        },
        { once: true },
      );
    });
  }
}

// =========================================
// REGISTER COMPONENT
// =========================================

if (!customElements.get("image-audio-cards")) {
  customElements.define("image-audio-cards", ImageAudioCards);
}
