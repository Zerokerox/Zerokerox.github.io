class ThaiReadingLessonPage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.currentAudio = null;
    this.currentElement = null;

    this.sectionsData = [
      {
        type: "illustrated-sentences",
        items: [
          {
            id: "item-1",
            imageSrc: "/Images/สระอำ/สระอำ 1.png",
            imageAlt: "ตาขำเวลา อาสีดารำระบำ",
            sentences: [
              {
                fullText: "ตาขำเวลา อาสีดารำระบำ",
                audioSrc: "audio/ekaa_tee_ngoo.mp3",
                words: [
                  {
                    text: "ตาขำเวลา",
                    audioSrc: "audio/ekaa.mp3",
                  },
                  {
                    text: "อาสีดารำระบำ",
                    audioSrc: "audio/ekaa.mp3",
                  },
                ],
              },
            ],
          },
          {
            id: "item-2",
            imageSrc: "/Images/สระอำ/สระอำ 2.png",
            imageAlt: "อาดูตำราทำยา",
            sentences: [
              {
                fullText: "อาดูตำราทำยา",
                audioSrc: "audio/ekaa_tee_ngoo.mp3",
                words: [
                  {
                    text: "อาดูตำราทำยา",
                    audioSrc: "audio/ekaa.mp3",
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    this.render();
  }

  connectedCallback() {
    this.bindEvents();
  }

  // =========================
  // AUDIO PLAYER
  // =========================

  playAudio(src, element) {
    if (!src) return;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;

      if (this.currentElement) {
        this.currentElement.classList.remove("playing");
      }
    }

    this.currentAudio = new Audio(src);
    this.currentElement = element;

    if (element) {
      element.classList.add("playing");
    }

    const clearPlaying = () => {
      if (this.currentElement) {
        this.currentElement.classList.remove("playing");
      }

      this.currentAudio = null;
      this.currentElement = null;
    };

    this.currentAudio.addEventListener("ended", clearPlaying, {
      once: true,
    });

    this.currentAudio.addEventListener("error", clearPlaying, {
      once: true,
    });

    this.currentAudio.play().catch((error) => {
      console.warn("ไม่สามารถเล่นไฟล์เสียงได้:", src);
      clearPlaying();
    });
  }

  // =========================
  // HTML ESCAPE
  // =========================

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

  // =========================
  // RENDER
  // =========================

  render() {
    const items = this.sectionsData.flatMap((section) => section.items);

    this.shadowRoot.innerHTML = `
      <style>

        :host {
          display: block;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;

          --primary: #7356a5;
          --primary-light: #a18bd3;
          --text-color: #52647c;

          container-type: inline-size;
        }

        * {
          box-sizing: border-box;
        }

        /* =========================
           MAIN GLASS CONTAINER
        ========================= */

        .page-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          width: 100%;
          min-width: 0;

          padding: clamp(14px, 4cqi, 26px);

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.84),
              rgba(255,255,255,0.55)
            );

          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 22px;

          box-shadow:
            0 8px 30px rgba(70,85,130,0.09),
            inset 0 1px 1px rgba(255,255,255,0.95);

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .page-card::before {
          content: "";

          position: absolute;
          z-index: -1;

          width: 220px;
          height: 220px;

          top: -130px;
          right: -70px;

          background: rgba(161,139,211,0.17);

          filter: blur(45px);
          border-radius: 50%;

          pointer-events: none;
        }

        /* =========================
           LESSON LIST
        ========================= */

        .illustrated-list {
          display: flex;
          flex-direction: column;

          gap: clamp(14px, 3cqi, 22px);
        }

        /* =========================
           LESSON ROW
        ========================= */

        .illustrated-row {
          display: grid;

          grid-template-columns:
            minmax(100px, 150px)
            minmax(0, 1fr);

          gap: clamp(12px, 3cqi, 24px);

          align-items: center;

          padding: clamp(10px, 2.5cqi, 16px);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.92),
              rgba(247,245,255,0.68)
            );

          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 18px;

          box-shadow:
            0 5px 16px rgba(80,90,130,0.06),
            inset 0 1px 1px white;

          transition:
            transform .22s ease,
            box-shadow .22s ease,
            border-color .22s ease;
        }

        .illustrated-row:hover {
          border-color: rgba(161,139,211,0.4);

          box-shadow:
            0 9px 22px rgba(115,86,165,0.10),
            inset 0 1px 1px white;
        }

        /* =========================
           IMAGE
        ========================= */

        .image-container {
          position: relative;

          width: 100%;
          aspect-ratio: 4 / 3;

          overflow: hidden;

          border-radius: 13px;

          background: #f1eff8;

          border: 1px solid rgba(255,255,255,0.95);

          box-shadow:
            0 4px 12px rgba(70,85,130,0.08);
        }

        .lesson-img {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;

          transition: transform .35s ease;
        }

        .illustrated-row:hover .lesson-img {
          transform: scale(1.06);
        }

        /* =========================
           SENTENCES
        ========================= */

        .sentences-container {
          display: flex;
          flex-direction: column;
          gap: 12px;

          min-width: 0;
        }

        .sentence-block {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 8px;

          min-width: 0;
          flex-wrap: wrap;
        }

        .word-item {
          display: inline-block;

          min-width: 0;

          font-size: clamp(1.25rem, 5cqi, 2rem);
          font-weight: 700;

          line-height: 1.6;

          color: var(--text-color);

          padding: 3px 7px;

          border-radius: 9px;

          cursor: pointer;
          user-select: none;

          transition:
            color .2s ease,
            background .2s ease,
            transform .2s ease;
        }

        .word-item:hover {
          color: var(--primary);

          background: rgba(161,139,211,0.12);
        }

        .word-item:active {
          transform: scale(.96);
        }

        .word-item:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        /* =========================
           AUDIO BUTTON
        ========================= */

        .play-sentence-btn {
          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          width: 42px;
          height: 42px;

          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 50%;

          background:
            linear-gradient(
              135deg,
              #a18bd3,
              #7356a5
            );

          color: white;

          font-size: 18px;

          cursor: pointer;

          box-shadow:
            0 4px 12px rgba(115,86,165,0.22),
            inset 0 1px 1px rgba(255,255,255,0.35);

          transition:
            transform .2s ease,
            box-shadow .2s ease;
        }

        .play-sentence-btn:hover {
          transform: scale(1.1);

          box-shadow:
            0 7px 16px rgba(115,86,165,0.3);
        }

        .play-sentence-btn:active {
          transform: scale(.92);
        }

        .play-sentence-btn:focus-visible {
          outline: 3px solid rgba(115,86,165,.4);
          outline-offset: 3px;
        }

        .play-sentence-btn.playing {
          animation: soundPulse .7s ease-in-out infinite alternate;
        }

        @keyframes soundPulse {
          from {
            box-shadow: 0 0 0 3px rgba(115,86,165,.10);
          }

          to {
            box-shadow: 0 0 0 8px rgba(115,86,165,.18);
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @container (max-width: 480px) {
          .illustrated-row {
            grid-template-columns:
              minmax(85px, 105px)
              minmax(0, 1fr);

            gap: 10px;
            padding: 9px;
          }

          .image-container {
            border-radius: 10px;
          }

          .word-item {
            font-size: clamp(1.15rem, 5cqi, 1.5rem);
          }

          .play-sentence-btn {
            width: 36px;
            height: 36px;
            font-size: 15px;
          }
        }

        @container (max-width: 300px) {
          .illustrated-row {
            grid-template-columns: 1fr;
          }

          .image-container {
            width: 100%;
            max-width: 220px;
            margin: 0 auto;
          }

          .sentence-block {
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .illustrated-row,
          .lesson-img,
          .word-item,
          .play-sentence-btn {
            transition: none;
            animation: none;
          }
        }

      </style>

      <div class="page-card">

        <div class="illustrated-list">

          ${items
            .map(
              (item) => `
            <div class="illustrated-row">

              <div class="image-container">

                <img
                  class="lesson-img"
                  src="${this.escapeHTML(item.imageSrc)}"
                  alt="${this.escapeHTML(item.imageAlt)}"
                  loading="lazy"
                >

              </div>

              <div class="sentences-container">

                ${item.sentences
                  .map(
                    (sentence) => `
                  <div class="sentence-block">

                    ${sentence.words
                      .map(
                        (word) => `
                      <span
                        class="word-item"
                        data-audio="${this.escapeHTML(word.audioSrc)}"
                        role="button"
                        tabindex="${word.audioSrc ? "0" : "-1"}"
                        aria-label="ฟังคำ ${this.escapeHTML(word.text)}"
                      >
                        ${this.escapeHTML(word.text)}
                      </span>
                    `,
                      )
                      .join("")}

                    <button
                      type="button"
                      class="play-sentence-btn"
                      data-audio="${this.escapeHTML(sentence.audioSrc)}"
                      aria-label="ฟังทั้งประโยค ${this.escapeHTML(sentence.fullText)}"
                      title="ฟังทั้งประโยค"
                    >
                      🔊
                    </button>

                  </div>
                `,
                  )
                  .join("")}

              </div>

            </div>
          `,
            )
            .join("")}

        </div>

      </div>
    `;
  }

  // =========================
  // EVENTS
  // =========================

  bindEvents() {
    const clickableElements = this.shadowRoot.querySelectorAll("[data-audio]");

    clickableElements.forEach((element) => {
      const play = () => {
        const audioSrc = element.getAttribute("data-audio");

        if (audioSrc) {
          this.playAudio(audioSrc, element);
        }
      };

      element.addEventListener("click", (event) => {
        event.stopPropagation();
        play();
      });

      if (element.classList.contains("word-item")) {
        element.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            play();
          }
        });
      }
    });
  }

  disconnectedCallback() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    this.currentElement = null;
  }
}

if (!customElements.get("thai-reading-lesson-page")) {
  customElements.define("thai-reading-lesson-page", ThaiReadingLessonPage);
}
