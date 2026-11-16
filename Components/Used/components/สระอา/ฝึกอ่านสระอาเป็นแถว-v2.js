class ThaiSentenceLesson extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    // ข้อมูลบทเรียน
    this.lessonsData = [
      {
        id: "sentence-1",
        fullSentence: "ตา พา อา มา ศาลา",

        image: "/Images/สระอา/ตาพาอามาศาลา.jpg",

        sentenceAudio: "/Audio/สระอา/ตาพาอามาศาลา/ตาพาอามาศาลา.m4a",

        words: [
          {
            word: "ตา",
            spell: "ตอ อา ตา",
            audio: "/Audio/สระอา/ตา พา อา มา ศา ลา/ตา-1.m4a",
          },
          {
            word: "พา",
            spell: "พอ อา พา",
            audio: "/Audio/สระอา/ตา พา อา มา ศา ลา/พา-1.m4a",
          },
          {
            word: "อา",
            spell: "ออ อา อา",
            audio: "/Audio/สระอา/ตา พา อา มา ศา ลา/อา-1.m4a",
          },
          {
            word: "มา",
            spell: "มอ อา มา",
            audio: "/Audio/สระอา/ตา พา อา มา ศา ลา/มา-1.m4a",
          },
          {
            word: "ศาลา",
            spell: "สอ อา ศา / ลอ อา ลา",
            audio: "/Audio/สระอา/ตา พา อา มา ศา ลา/ศาลา.m4a",
          },
        ],
      },

      {
        id: "sentence-2",
        fullSentence: "อา ทา ยา ชา ขา ตา",

        image: "/Images/สระอา/อาทายาชาขาตา.jpg",

        sentenceAudio: "/Audio/สระอา/อาทายาชาขาตา/อาทายาชาขาตา.m4a",

        words: [
          {
            word: "อา",
            spell: "ออ อา อา",
            audio: "/Audio/สระอา/อา ทา ยา ชา ขา ตา/อา-1.m4a",
          },
          {
            word: "ทา",
            spell: "ทอ อา ทา",
            audio: "/Audio/สระอา/อา ทา ยา ชา ขา ตา/ทา-1.m4a",
          },
          {
            word: "ยา",
            spell: "ยอ อา ยา",
            audio: "/Audio/สระอา/อา ทา ยา ชา ขา ตา/ยา.m4a",
          },
          {
            word: "ชา",
            spell: "ชอ อา ชา",
            audio: "/Audio/สระอา/อา ทา ยา ชา ขา ตา/ชา.m4a",
          },
          {
            word: "ขา",
            spell: "ขอ อา ขา",
            audio: "/Audio/สระอา/อา ทา ยา ชา ขา ตา/ขา.m4a",
          },
          {
            word: "ตา",
            spell: "ตอ อา ตา",
            audio: "/Audio/สระอา/อา ทา ยา ชา ขา ตา/ตา-1.m4a",
          },
        ],
      },
    ];

    this.player = new Audio();

    this.render();
  }

  connectedCallback() {
    this.bindEvents();
  }

  disconnectedCallback() {
    this.player.pause();
    this.player.removeAttribute("src");
  }

  // ระบบเล่นเสียง
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

            /* Image */

            .image-box {
              width: 100%;
              overflow: hidden;
              border-radius: 8px;
              border: 1px solid #e0e0e0;
              margin-bottom: 16px;
              background: #fafafa;
            }

            .image-box img {
              display: block;
              width: 100%;
              height: auto;
              object-fit: contain;
            }

            /* Words */

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
              -webkit-tap-highlight-color: transparent;
              transition: 0.15s;
            }

            .word-card:active {
              transform: scale(0.92);
              background: #eef7f2;
              color: var(--lesson-active);
            }

            .word-card:focus-visible {
              outline: 3px solid #f9a825;
              outline-offset: 3px;
            }

            /* Sentence Button */

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

            .play-sentence-btn:focus-visible {
              outline: 3px solid #f9a825;
              outline-offset: 3px;
            }

            .divider {
              height: 1px;
              background: #e0e0e0;
              margin: 24px 0;
            }

          </style>

          <div class="book-container">

            ${this.lessonsData
              .map(
                (item, index) => `

              <div class="section-block"
                   data-section="${item.id}">

                <!-- Image -->
                <div class="image-box">

                  <img
                    src="${item.image}"
                    alt="${item.fullSentence}"
                    loading="lazy"
                  >

                </div>

                <!-- Words -->
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
                    >
                      ${w.word}
                    </span>

                  `,
                    )
                    .join("")}

                </div>

                <!-- Sentence Audio -->
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
    // เล่นเสียงคำศัพท์
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

    // เล่นเสียงประโยค
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

// ลงทะเบียน Component
customElements.define("thai-sentence-lesson", ThaiSentenceLesson);
