class ThaiCharCardWithLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.audio = null;
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    const titleChar = this.getAttribute("title-char") || "";
    const readingSound = this.getAttribute("reading-sound") || "";
    const youtubeLink = this.getAttribute("youtube-link") || "";
    const imageUrl = this.getAttribute("image-url") || "";
    const audioUrl = this.getAttribute("audio-url") || "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: system-ui, sans-serif;
        }

        .reading-card {
          --accent: #6366f1;
          width: 100%;
          max-width: 360px;
          box-sizing: border-box;
          padding: 24px;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          background: linear-gradient(145deg, #fff, #f8faff);
          box-shadow: 0 8px 24px rgba(31, 41, 55, 0.06);
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .reading-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 32px rgba(31, 41, 55, 0.1);
        }

        .reading-card__header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .reading-card__title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .reading-card__title {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 76px;
          height: 76px;
          margin: 0;
          border-radius: 16px;
          background: #eef2ff;
          color: var(--accent);
          font-size: 40px;
          font-weight: 700;
          line-height: 1.2;
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
          transition: background 0.2s, transform 0.2s;
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
          min-width: 0;
        }

        .reading-card__label {
          color: #6b7280;
          font-size: 13px;
          font-weight: 500;
        }

        .reading-card__sound {
          margin: 6px 0 0;
          color: #1f2937;
          font-size: 19px;
          font-weight: 600;
          overflow-wrap: anywhere;
        }

        .reading-card__image {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          border-radius: 14px;
          margin-bottom: 18px;
          background: #f3f4f6;
          cursor: zoom-in;
        }

        .reading-card__image:focus-visible {
          outline: 3px solid #6366f1;
          outline-offset: 3px;
        }

        .reading-card__link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 15px;
          border-radius: 12px;
          background: #fff1f2;
          color: #be123c;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .reading-card__link:hover {
          background: #ffe4e6;
        }

        .reading-card__play {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #e11d48;
          color: white;
          font-size: 13px;
        }

        .reading-card__arrow {
          margin-left: auto;
          font-size: 18px;
        }

        .image-lightbox {
          position: fixed;
          inset: 0;
          z-index: 2147483647;
          display: none;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 60px 20px 24px;
          background: rgba(0, 0, 0, 0.88);
        }

        .image-lightbox.is-open {
          display: flex;
        }

        .image-lightbox__image {
          display: block;
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
        }

        .image-lightbox__close {
          position: absolute;
          top: 12px;
          right: 18px;
          width: 44px;
          height: 44px;
          padding: 0;
          border: none;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          color: white;
          font-size: 32px;
          cursor: pointer;
        }

        @media (max-width: 400px) {
          .reading-card {
            padding: 18px;
          }

          .reading-card__title {
            width: 64px;
            height: 64px;
            font-size: 34px;
          }

          .reading-card__header {
            gap: 10px;
          }

          .reading-card__title-row {
            gap: 6px;
          }

          .reading-card__speaker {
            width: 36px;
            height: 36px;
          }

          .image-lightbox {
            padding: 56px 10px 16px;
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
            <span class="reading-card__label">วิธีอ่าน</span>
            <p class="reading-card__sound"></p>
          </div>
        </div>

        ${
          imageUrl
            ? `<img
                 class="reading-card__image"
                 src="${this.escapeHTML(imageUrl)}"
                 alt="ภาพประกอบตัวอักษร ${this.escapeHTML(titleChar)}"
                 loading="lazy"
                 tabindex="0"
                 role="button"
                 aria-label="คลิกเพื่อขยายภาพ"
               >`
            : ""
        }

        <a
          class="reading-card__link"
          href="https://www.youtube.com/watch?v=${encodeURIComponent(youtubeLink)}&list=PLvoH85XExQXJo3v4NlDbjNDLFQMJyePaC&index=2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="reading-card__play">▶</span>
          <span>วิธีเขียน</span>
          <span class="reading-card__arrow">↗</span>
        </a>
      </article>

      <div
        class="image-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="ภาพขนาดใหญ่"
        aria-hidden="true"
      >
        <button
          class="image-lightbox__close"
          type="button"
          aria-label="ปิดภาพ"
        >&times;</button>
        <img class="image-lightbox__image" alt="">
      </div>
    `;

    this.shadowRoot.querySelector(".reading-card__title").textContent =
      titleChar;

    this.shadowRoot.querySelector(".reading-card__sound").textContent =
      readingSound;

    this.speaker = this.shadowRoot.querySelector(".reading-card__speaker");

    this.lightbox = this.shadowRoot.querySelector(".image-lightbox");
    this.largeImage = this.shadowRoot.querySelector(".image-lightbox__image");
    this.thumbnail = this.shadowRoot.querySelector(".reading-card__image");

    this.speaker.addEventListener("click", () => {
      this.playAudio(audioUrl);
    });

    this.speaker.addEventListener("keydown", this.handleKeydown);

    if (this.thumbnail) {
      this.thumbnail.addEventListener("click", () => {
        this.openLightbox();
      });

      this.thumbnail.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.openLightbox();
        }
      });
    }

    this.shadowRoot
      .querySelector(".image-lightbox__close")
      .addEventListener("click", () => this.closeLightbox());

    this.lightbox.addEventListener("click", (event) => {
      if (event.target === this.lightbox) {
        this.closeLightbox();
      }
    });

    document.addEventListener("keydown", this.handleKeydown);
  }

  async playAudio(url) {
    if (!url) return;

    if (this.audio && !this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.speaker.classList.remove("is-playing");
      this.speaker.setAttribute("aria-label", "เล่นเสียงอ่าน");
      return;
    }

    const absoluteUrl = new URL(url, document.baseURI).href;

    if (!this.audio || this.audio.src !== absoluteUrl) {
      if (this.audio) {
        this.audio.pause();
      }

      this.audio = new Audio(absoluteUrl);

      this.audio.addEventListener("ended", () => {
        this.speaker.classList.remove("is-playing");
        this.speaker.setAttribute("aria-label", "เล่นเสียงอ่าน");
      });

      this.audio.addEventListener("error", () => {
        this.speaker.classList.remove("is-playing");
        this.speaker.setAttribute("aria-label", "เล่นเสียงอ่าน");
        console.error("โหลดไฟล์เสียงไม่สำเร็จ:", absoluteUrl);
      });
    }

    try {
      this.audio.currentTime = 0;
      await this.audio.play();

      this.speaker.classList.add("is-playing");
      this.speaker.setAttribute("aria-label", "หยุดเสียงอ่าน");
    } catch (error) {
      this.speaker.classList.remove("is-playing");
      console.error("ไม่สามารถเล่นเสียงได้:", error);
    }
  }

  openLightbox() {
    if (!this.thumbnail || !this.lightbox) return;

    this.largeImage.src = this.thumbnail.src;
    this.largeImage.alt = this.thumbnail.alt;

    this.lightbox.classList.add("is-open");
    this.lightbox.setAttribute("aria-hidden", "false");

    this.shadowRoot.querySelector(".image-lightbox__close").focus();
  }

  closeLightbox() {
    if (!this.lightbox) return;

    this.lightbox.classList.remove("is-open");
    this.lightbox.setAttribute("aria-hidden", "true");

    if (this.thumbnail) {
      this.thumbnail.focus();
    }
  }

  handleKeydown(event) {
    if (event.key === "Escape") {
      this.closeLightbox();
    }
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

  disconnectedCallback() {
    document.removeEventListener("keydown", this.handleKeydown);

    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}

customElements.define(
  "my-char-card-with-link-style-image-shower-audio",
  ThaiCharCardWithLink,
);
