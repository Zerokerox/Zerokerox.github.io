class ThaiVowelCardWithAudio extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.audio = null;
    this.isStarting = false;
    this._initialized = false;

    this.handleKeydown = this.handleKeydown.bind(this);
  }

  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    const titleChar = this.getAttribute("title-char") || "";
    const readingSound = this.getAttribute("reading-sound") || "";
    const audioUrl = this.getAttribute("audio-url") || "";

    this.shadowRoot.innerHTML = `
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700&display=swap');

        .reading-card__title,
        .reading-card__sound {
          font-family: "Noto Sans Thai", sans-serif !important;
          font-kerning: normal;
          font-variant-ligatures: none;
          line-height: 2.5;
          overflow: visible;
        }
        :host {
          display: block;
          width: 100%;
          overflow: visible !important;

          font-family: Tahoma, sans-serif;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }

        * {
          box-sizing: border-box;
        }

        .reading-card {
          --accent: #6366f1;

          display: block;
          width: 100%;
          max-width: 360px;

          padding: 24px;

          border: 1px solid #e5e7eb;
          border-radius: 20px;

          background: linear-gradient(
            145deg,
            #ffffff,
            #f8faff
          );

          box-shadow: 0 8px 24px rgba(31, 41, 55, 0.06);

          overflow: visible !important;

          transition:
            transform 0.25s,
            box-shadow 0.25s;
        }

        .reading-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 32px rgba(31, 41, 55, 0.1);
        }

        .reading-card__header {
          display: flex;
          align-items: center;
          gap: 14px;

          overflow: visible !important;
        }

        .reading-card__title-row {
          display: flex;
          align-items: center;
          gap: 8px;

          flex-shrink: 0;

          overflow: visible !important;
        }

        /*
          Thai character rendering
          Android Chrome clipping fix
        */

        .reading-card__title {
          display: block !important;

          width: 96px;
          min-width: 96px;

          height: auto;
          min-height: 0;

          margin: 0;

          padding: 16px 5px 20px;

          border: none;
          border-radius: 16px;

          background: #eef2ff;
          color: var(--accent);

          font-family:
            Tahoma,
            "Noto Sans Thai",
            sans-serif;

          font-size: 40px;
          font-weight: 700;

          line-height: 2.5;

          text-align: center;
          white-space: nowrap;

          overflow: visible !important;

          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;

          -webkit-font-smoothing: antialiased;
        }

        .reading-card__speaker {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 40px;
          height: 40px;

          flex-shrink: 0;

          padding: 0;

          border: none;
          border-radius: 50%;

          background: #eef2ff;
          color: #4f46e5;

          cursor: pointer;

          transition:
            background 0.2s,
            transform 0.2s;
        }

        .reading-card__speaker:hover {
          background: #c7d2fe;
          transform: scale(1.06);
        }

        .reading-card__speaker:focus-visible {
          outline: 3px solid #818cf8;
          outline-offset: 3px;
        }

        .reading-card__speaker svg {
          display: block;

          width: 22px;
          height: 22px;

          fill: none;
          stroke: currentColor;
          stroke-width: 2;

          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .reading-card__speaker.is-playing {
          background: #c7d2fe;
          color: #3730a3;
        }

        .reading-card__content {
          flex: 1;
          min-width: 0;

          overflow: visible !important;
        }

        .reading-card__label {
          display: block;

          padding: 2px 0;

          color: #6b7280;

          font-family: Tahoma, sans-serif;
          font-size: 13px;
          font-weight: 500;

          line-height: 2;
        }

        .reading-card__sound {
          display: block;

          margin: 6px 0 0;
          padding: 12px 4px 16px;

          color: #1f2937;

          font-family:
            Tahoma,
            "Noto Sans Thai",
            sans-serif;

          font-size: 19px;
          font-weight: 600;

          line-height: 2.5;

          overflow: visible !important;
          overflow-wrap: anywhere;

          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }

        /*
          Mobile layout
        */

        @media (max-width: 400px) {
          .reading-card {
            padding: 18px;
          }

          .reading-card__header {
            flex-wrap: wrap;
            align-items: center;
            gap: 12px;
          }

          .reading-card__title {
            width: 64px;
            min-width: 64px;

            padding: 12px 3px 16px;

            font-size: 34px;
            line-height: 2.5;
          }

          .reading-card__title-row {
            gap: 6px;
          }

          .reading-card__speaker {
            width: 36px;
            height: 36px;
          }
        }

        /*
          Accessibility
        */

        @media (prefers-reduced-motion: reduce) {
          .reading-card,
          .reading-card__speaker {
            transition: none;
          }
        }

      </style>

      <article class="reading-card">

        <div class="reading-card__header">

          <div class="reading-card__title-row">

            <h2 class="reading-card__title"></h2>

            <button
              class="reading-card__speaker"
              type="button"
              aria-label="เล่นเสียงอ่าน"
              title="เล่นเสียงอ่าน"
              ${audioUrl ? "" : "disabled"}
            >

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4z"></path>
                <path d="M15.5 8.5a5 5 0 0 1 0 7"></path>
                <path d="M19 5a10 10 0 0 1 0 14"></path>
              </svg>

            </button>

          </div>

          <div class="reading-card__content">

            <span class="reading-card__label">
              วิธีอ่าน
            </span>

            <p class="reading-card__sound"></p>

          </div>

        </div>

      </article>
    `;

    this.shadowRoot.querySelector(".reading-card__title").textContent =
      titleChar;

    this.shadowRoot.querySelector(".reading-card__sound").textContent =
      readingSound;

    this.speaker = this.shadowRoot.querySelector(".reading-card__speaker");

    if (audioUrl) {
      this.audio = new Audio();

      this.audio.preload = "auto";

      this.audio.src = new URL(audioUrl, document.baseURI).href;

      this.audio.addEventListener("ended", () => {
        this.resetSpeaker();
      });

      this.audio.addEventListener("error", () => {
        this.resetSpeaker();
      });
    }

    this.speaker.addEventListener("click", () => {
      this.playAudio();
    });

    document.addEventListener("keydown", this.handleKeydown);
  }

  resetSpeaker() {
    this.isStarting = false;

    if (!this.speaker) return;

    this.speaker.classList.remove("is-playing");

    this.speaker.setAttribute("aria-label", "เล่นเสียงอ่าน");

    this.speaker.removeAttribute("aria-busy");
  }

  async playAudio() {
    if (!this.audio || this.isStarting) return;

    if (!this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;

      this.resetSpeaker();
      return;
    }

    this.isStarting = true;

    this.speaker.setAttribute("aria-busy", "true");

    try {
      this.audio.currentTime = 0;

      await this.audio.play();

      this.speaker.classList.add("is-playing");

      this.speaker.setAttribute("aria-label", "หยุดเสียงอ่าน");
    } catch (error) {
      console.error("ไม่สามารถเล่นเสียงได้:", error);

      this.resetSpeaker();
    } finally {
      this.isStarting = false;

      this.speaker.removeAttribute("aria-busy");
    }
  }

  handleKeydown(event) {
    // Reserved for future keyboard controls
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this.handleKeydown);

    if (this.audio) {
      this.audio.pause();
      this.audio.removeAttribute("src");
      this.audio.load();

      this.audio = null;
    }

    this.isStarting = false;
    this.speaker = null;
    this._initialized = false;
  }
}

if (!customElements.get("my-vowel-card-with-audio")) {
  customElements.define("my-vowel-card-with-audio", ThaiVowelCardWithAudio);
}
