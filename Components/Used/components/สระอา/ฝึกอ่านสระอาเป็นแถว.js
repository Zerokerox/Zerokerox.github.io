class ThaiSentenceLesson extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    // ข้อมูลบทเรียน
    this.lessonsData = [
      {
        id: "sentence-1",
        fullSentence: "ตา พา อา มา ศาลา",

        sentenceAudio: "audio/sentence-1.mp3",

        imageSvg: `
              <svg viewBox="0 0 300 180"
                   width="100%" height="auto">
                <rect width="300" height="180"
                      fill="#e8f5e9" rx="8"/>
                <path d="M40 90 L80 50 L120 90 Z"
                      fill="#b71c1c"/>
                <rect x="50" y="90" width="10" height="50"
                      fill="#795548"/>
                <rect x="100" y="90" width="10" height="50"
                      fill="#795548"/>
                <rect x="45" y="140" width="70" height="8"
                      fill="#a1887f"/>
                <circle cx="230" cy="80" r="35"
                        fill="#81c784"/>
                <circle cx="260" cy="90" r="25"
                        fill="#66bb6a"/>
                <circle cx="155" cy="85" r="8"
                        fill="#ffcc80"/>
                <path d="M155 93 L155 125"
                      stroke="#795548" stroke-width="4"/>
                <circle cx="185" cy="88" r="8"
                        fill="#ffcc80"/>
                <path d="M185 96 L185 125"
                      stroke="#fbc02d" stroke-width="4"/>
              </svg>
            `,

        words: [
          {
            word: "ตา",
            spell: "ตอ อา ตา",
            audio: "",
          },
          {
            word: "พา",
            spell: "พอ อา พา",
            audio: "",
          },
          {
            word: "อา",
            spell: "ออ อา อา",
            audio: "",
          },
          {
            word: "มา",
            spell: "มอ อา มา",
            audio: "",
          },
          {
            word: "ศาลา",
            spell: "สอ อา ศา / ลอ อา ลา",
            audio: "",
          },
        ],
      },

      {
        id: "sentence-2",
        fullSentence: "อา ทา ยา ชา ขา ตา",

        sentenceAudio: "",

        imageSvg: `
              <svg viewBox="0 0 300 180"
                   width="100%" height="auto">
                <rect width="300" height="180"
                      fill="#fffde7" rx="8"/>
                <circle cx="200" cy="70" r="14"
                        fill="#ffcc80"/>
                <path d="M200 84 L200 120"
                      stroke="#795548" stroke-width="6"/>
                <path d="M200 120 L140 125"
                      stroke="#795548" stroke-width="6"/>
                <circle cx="110" cy="85" r="13"
                        fill="#ffcc80"/>
                <path d="M110 98 L110 135"
                      stroke="#fbc02d" stroke-width="6"/>
                <path d="M110 110 L145 120"
                      stroke="#fbc02d" stroke-width="4"/>
                <circle cx="145" cy="120" r="4"
                        fill="#ef5350"/>
              </svg>
            `,

        words: [
          {
            word: "อา",
            spell: "ออ อา อา",
            audio: "",
          },
          {
            word: "ทา",
            spell: "ทอ อา ทา",
            audio: "",
          },
          {
            word: "ยา",
            spell: "ยอ อา ยา",
            audio: "",
          },
          {
            word: "ชา",
            spell: "ชอ อา ชา",
            audio: "",
          },
          {
            word: "ขา",
            spell: "ขอ อา ขา",
            audio: "",
          },
          {
            word: "ตา",
            spell: "ตอ อา ตา",
            audio: "",
          },
        ],
      },
    ];

    this.render();
  }

  connectedCallback() {
    this.bindEvents();
  }

  disconnectedCallback() {
    if (this.player) {
      this.player.pause();
      this.player.removeAttribute("src");
    }
  }

  // เล่น Audio Clip
  playAudio(src, detail = {}) {
    if (!src) {
      this.dispatchEvent(
        new CustomEvent("audio-missing", {
          bubbles: true,
          composed: true,
          detail,
        }),
      );
      return;
    }

    if (!this.player) {
      this.player = new Audio();
    }

    this.player.pause();
    this.player.currentTime = 0;
    this.player.src = src;

    this.dispatchEvent(
      new CustomEvent("lesson-audio-play", {
        bubbles: true,
        composed: true,
        detail: { ...detail, src },
      }),
    );

    this.player.play().catch((error) => {
      this.dispatchEvent(
        new CustomEvent("lesson-audio-error", {
          bubbles: true,
          composed: true,
          detail: { ...detail, src, error },
        }),
      );
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              width: 100%;
              box-sizing: border-box;
              font-family: 'Sarabun', 'Prompt', sans-serif;

              --lesson-primary: #2b5282;
              --lesson-active: #438258;
              --lesson-border: #a4b2c6;
              --lesson-background: #ffffff;
            }

            * {
              box-sizing: border-box;
            }

            .book-container {
              width: 100%;
              background: var(--lesson-background);
              border: 2px solid var(--lesson-border);
              border-radius: 12px;
              padding: 20px 16px;
            }

            .section-block {
              width: 100%;
              margin-bottom: 28px;
              text-align: center;
            }

            .section-block:last-child {
              margin-bottom: 0;
            }

            .image-box {
              width: 100%;
              border-radius: 8px;
              overflow: hidden;
              border: 1px solid #e0e0e0;
              margin-bottom: 16px;
              background: #fafafa;
            }

            .image-box svg {
              display: block;
              width: 100%;
              height: auto;
            }

            .sentence-row {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              gap: 8px;
              margin-bottom: 10px;
            }

            .word-card {
              display: inline-block;
              padding: 4px 8px;
              font-size: 2rem;
              font-weight: bold;
              color: var(--lesson-primary);
              border-radius: 6px;
              cursor: pointer;
              user-select: none;
              transition: 0.15s;
            }

            .word-card:active {
              transform: scale(0.92);
              background: #eef7f2;
              color: var(--lesson-active);
            }

            .play-sentence-btn {
              background: var(--lesson-active);
              color: white;
              border: none;
              border-radius: 20px;
              padding: 8px 18px;
              font-size: 0.95rem;
              font-weight: bold;
              cursor: pointer;
              margin-top: 4px;
            }

            .play-sentence-btn:active {
              transform: scale(0.96);
              background: #2e593c;
            }

            .divider {
              height: 1px;
              background: #e0e0e0;
              margin: 24px 0;
            }

            button:focus-visible,
            .word-card:focus-visible {
              outline: 3px solid #f9a825;
              outline-offset: 3px;
            }
          </style>

          <div class="book-container">

            ${this.lessonsData
              .map(
                (item, index) => `
              <div class="section-block"
                   data-section="${item.id}">

                <div class="image-box">
                  ${item.imageSvg}
                </div>

                <div class="sentence-row">
                  ${item.words
                    .map(
                      (w, wordIndex) => `
                    <span
                      class="word-card"
                      role="button"
                      tabindex="0"
                      data-word="${w.word}"
                      data-spell="${w.spell}"
                      data-audio="${w.audio}"
                      data-index="${wordIndex}"
                    >${w.word}</span>
                  `,
                    )
                    .join("")}
                </div>

                <button
                  class="play-sentence-btn"
                  data-sentence="${item.fullSentence}"
                  data-audio="${item.sentenceAudio}"
                >
                  🔊 อ่านทั้งประโยค
                </button>

              </div>

              ${
                index < this.lessonsData.length - 1
                  ? '<div class="divider"></div>'
                  : ""
              }

            `,
              )
              .join("")}

          </div>
        `;
  }

  bindEvents() {
    // คลิกหรือกด Enter/Space เพื่อเล่นเสียงคำศัพท์
    this.shadowRoot.querySelectorAll(".word-card").forEach((card) => {
      const play = () => {
        this.playAudio(card.dataset.audio, {
          type: "word",
          word: card.dataset.word,
          spell: card.dataset.spell,
        });
      };

      card.addEventListener("click", play);

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          play();
        }
      });
    });

    // เล่นเสียงทั้งประโยค
    this.shadowRoot.querySelectorAll(".play-sentence-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.playAudio(btn.dataset.audio, {
          type: "sentence",
          sentence: btn.dataset.sentence,
        });
      });
    });
  }
}

customElements.define("thai-sentence-lesson", ThaiSentenceLesson);
