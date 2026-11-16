class ThaiReadingPractice extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.wordsData = [
      {
        word: "กา",
        spell: "กอ อา กา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/Cut Clip/กา.m4a",
      },
      {
        word: "ขา",
        spell: "ขอ อา ขา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/ขา.m4a",
      },
      {
        word: "คา",
        spell: "คอ อา คา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/คา.m4a",
      },
      {
        word: "งา",
        spell: "งอ อา งา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/งา.m4a",
      },
      {
        word: "จา",
        spell: "จอ อา จา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/จา.m4a",
      },
      {
        word: "ชา",
        spell: "ชอ อา ชา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/ชา.m4a",
      },
      {
        word: "ซา",
        spell: "ซอ อา ซา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/ซา.m4a",
      },
      {
        word: "ตา",
        spell: "ตอ อา ตา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/ตา.m4a",
      },
      {
        word: "ทา",
        spell: "ทอ อา ทา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/ทา.m4a",
      },
      {
        word: "นา",
        spell: "นอ อา นา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/นา.m4a",
      },
      {
        word: "ปา",
        spell: "ปอ อา ปา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/ปา.m4a",
      },
      {
        word: "ผา",
        spell: "ผอ อา ผา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/ผา.m4a",
      },
      {
        word: "ฝา",
        spell: "ฝอ อา ฝา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/ฝา.m4a",
      },
      {
        word: "มา",
        spell: "มอ อา มา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/มา.m4a",
      },
      {
        word: "ยา",
        spell: "ยอ อา ยา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/ยา.m4a",
      },
      {
        word: "รา",
        spell: "รอ อา รา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/รา.m4a",
      },
      {
        word: "ลา",
        spell: "ลอ อา ลา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/ลา.m4a",
      },
      {
        word: "วา",
        spell: "วอ อา วา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/วา.m4a",
      },
      {
        word: "สา",
        spell: "สอ อา สา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/สา.m4a",
      },
      {
        word: "หา",
        spell: "หอ อา หา",
        audio: "/Audio/สระอา/ฝึกอ่านคำต่อไปนี้/หา.m4a",
      },
    ];
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  // เล่น Audio Clip
  playAudio(src) {
    if (!src) return;

    // หยุดเสียงก่อนหน้า
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    this.currentAudio = new Audio(src);

    this.currentAudio.play().catch((error) => {
      console.warn("ไม่สามารถเล่นไฟล์เสียงได้:", error);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              width: 100%;
              max-width: none;
              min-width: 0;
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            * {
              box-sizing: border-box;
            }

            .book-container {
              width: 100%;
              min-width: 0;
              background: #ffffff;
              border: 2px solid #a4b2c6;
              border-radius: 12px;
              padding: clamp(12px, 2.5vw, 20px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            }

            .header-box {
              text-align: center;
              margin-bottom: 24px;
            }

            .page-number {
              font-size: 0.95rem;
              color: #555555;
              margin-bottom: 8px;
            }

            .title {
              font-size: clamp(1.3rem, 3vw, 1.8rem);
              font-weight: bold;
              color: #438258;
              margin: 0;
            }

            /* ตารางปรับคอลัมน์ตามพื้นที่ */
            .grid-container {
              display: grid;
              grid-template-columns: repeat(5, minmax(0, 1fr));
              gap: clamp(6px, 1.5vw, 12px);
              row-gap: clamp(10px, 2vw, 20px);
              justify-items: stretch;
              align-items: center;
              width: 100%;
              padding: 10px 0;
            }

            .word-card {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              min-width: 0;
              min-height: 58px;
              padding: 8px 2px;
              background: #fdfdfd;
              border: 1px dashed #d1d5db;
              border-radius: 8px;
              cursor: pointer;
              user-select: none;
              -webkit-tap-highlight-color: transparent;
              transition: transform 0.1s ease,
                          background-color 0.1s ease;
            }

            .word-card:active {
              transform: scale(0.92);
              background: #eef7f2;
              border-color: #438258;
            }

            .word-card:focus-visible {
              outline: 3px solid #438258;
              outline-offset: 2px;
            }

            .word-text {
              font-size: clamp(1.5rem, 4vw, 2.2rem);
              font-weight: bold;
              line-height: 1;
              white-space: nowrap;
            }

            .char-consonant {
              color: #555555;
            }

            .char-vowel {
              color: #c62828;
            }

            @media (max-width: 400px) {
              .grid-container {
                grid-template-columns: repeat(4, minmax(0, 1fr));
              }
            }

            @media (max-width: 260px) {
              .grid-container {
                grid-template-columns: repeat(3, minmax(0, 1fr));
              }
            }
          </style>

          <div class="book-container">
            <div class="header-box">
              <!--<div class="page-number">
                8 • แบบหัดอ่านภาษาไทย เล่ม 1
              </div>-->

              <h2 class="title">ฝึกอ่านคำต่อไปนี้</h2>
            </div>

            <div class="grid-container">
              ${this.wordsData
                .map((item, index) => {
                  const consonant = item.word[0];
                  const vowel = item.word[1] || "";

                  return `
                  <button
                    type="button"
                    class="word-card"
                    data-index="${index}"
                    aria-label="เล่นเสียง ${item.word}"
                    ${item.audio ? "" : "disabled"}
                  >
                    <span class="word-text">
                      <span class="char-consonant">${consonant}</span><span class="char-vowel">${vowel}</span>
                    </span>
                  </button>
                `;
                })
                .join("")}
            </div>
          </div>
        `;
  }

  bindEvents() {
    const cards = this.shadowRoot.querySelectorAll(".word-card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const index = Number(card.dataset.index);
        const item = this.wordsData[index];

        this.playAudio(item.audio);
      });
    });
  }

  disconnectedCallback() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }
}

if (!customElements.get("thai-reading-practice")) {
  customElements.define("thai-reading-practice", ThaiReadingPractice);
}
