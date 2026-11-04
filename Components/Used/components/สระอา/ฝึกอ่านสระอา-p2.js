class ThaiReadingPhrases extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // ข้อมูลรูปภาพด้านบน
    this.imagesData = [
      {
        word: "ศาลา",
        spell: "สอ อา ศา / ลอ อา ลา",
        icon: "⛩️",
        audio: "",
      },
      {
        word: "ฝากา",
        spell: "ฝอ อา ฝา / กอ อา กา",
        icon: "🥘",
        audio: "",
      },
      {
        word: "ทายา",
        spell: "ทอ อา ทา / ยอ อา ยา",
        icon: "🧴",
        audio: "",
      },
    ];

    // ข้อมูลคำศัพท์ 12 คำ
    this.wordsData = [
      { word: "ตาอา", spell: "ตอ อา ตา / ออ อา อา", audio: "" },
      { word: "ฝากา", spell: "ฝอ อา ฝา / กอ อา กา", audio: "" },
      { word: "มาหา", spell: "มอ อา มา / หอ อา หา", audio: "" },

      { word: "ปากา", spell: "ปอ อา ปา / กอ อา กา", audio: "" },
      { word: "ยาชา", spell: "ยอ อา ยา / ชอ อา ชา", audio: "" },
      { word: "คาถา", spell: "คอ อา คา / ถอ อา ถา", audio: "" },

      { word: "วาจา", spell: "วอ อา วา / จอ อา จา", audio: "" },
      { word: "ศาลา", spell: "สอ อา ศา / ลอ อา ลา", audio: "" },
      { word: "มานา", spell: "มอ อา มา / นอ อา นา", audio: "" },

      { word: "อาสา", spell: "ออ อา อา / สอ อา สา", audio: "" },
      { word: "ราคา", spell: "รอ อา รา / คอ อา คา", audio: "" },
      { word: "ทายา", spell: "ทอ อา ทา / ยอ อา ยา", audio: "" },
    ];
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  // เล่น Audio Clip
  playAudio(src) {
    if (!src) return;

    // หยุดเสียงเดิมก่อน
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

            /* รูปภาพประกอบด้านบน */
            .top-images-grid {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: clamp(6px, 2vw, 10px);
              margin-bottom: 24px;
              padding-bottom: 16px;
              border-bottom: 2px dashed #e0e0e0;
            }

            .image-card {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-width: 0;
              background: #fafafa;
              border: 1px solid #d1d5db;
              border-radius: 10px;
              padding: clamp(8px, 2vw, 10px) 4px;
              cursor: pointer;
              user-select: none;
              -webkit-tap-highlight-color: transparent;
              transition: transform 0.1s ease,
                          background-color 0.1s ease;
            }

            .image-card:active {
              transform: scale(0.95);
              background: #eef7f2;
              border-color: #438258;
            }

            .img-icon {
              font-size: clamp(1.8rem, 5vw, 2.8rem);
              margin-bottom: 6px;
            }

            .img-text {
              font-size: clamp(0.9rem, 2.5vw, 1.3rem);
              font-weight: bold;
              color: #2b5282;
            }

            /* ตารางคำศัพท์ 3 คอลัมน์ */
            .grid-container {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: clamp(8px, 2vw, 12px);
              row-gap: clamp(10px, 2.5vw, 16px);
              width: 100%;
              justify-items: stretch;
              align-items: center;
            }

            .word-card {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              min-width: 0;
              min-height: 54px;
              padding: 10px 2px;
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
              transform: scale(0.95);
              background: #eef7f2;
              border-color: #438258;
            }

            .word-text {
              font-size: clamp(1.2rem, 3.5vw, 1.8rem);
              font-weight: bold;
              color: #2b5282;
              white-space: nowrap;
            }

            .image-card:focus-visible,
            .word-card:focus-visible {
              outline: 3px solid #438258;
              outline-offset: 2px;
            }

            @media (max-width: 260px) {
              .grid-container {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }
          </style>

          <div class="book-container">

            <!-- รูปภาพประกอบด้านบน -->
            <div class="top-images-grid">
              ${this.imagesData
                .map(
                  (item, index) => `
                <button
                  type="button"
                  class="image-card"
                  data-type="image"
                  data-index="${index}"
                  aria-label="เล่นเสียง ${item.word}"
                  ${item.audio ? "" : "disabled"}
                >
                  <span class="img-icon">${item.icon}</span>
                  <span class="img-text">${item.word}</span>
                </button>
              `,
                )
                .join("")}
            </div>

            <!-- ตารางคำศัพท์ 12 คำ -->
            <div class="grid-container">
              ${this.wordsData
                .map(
                  (item, index) => `
                <button
                  type="button"
                  class="word-card"
                  data-type="word"
                  data-index="${index}"
                  aria-label="เล่นเสียง ${item.word}"
                  ${item.audio ? "" : "disabled"}
                >
                  <span class="word-text">${item.word}</span>
                </button>
              `,
                )
                .join("")}
            </div>

          </div>
        `;
  }

  bindEvents() {
    const cards = this.shadowRoot.querySelectorAll(".image-card, .word-card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const index = Number(card.dataset.index);
        const type = card.dataset.type;

        const item =
          type === "image" ? this.imagesData[index] : this.wordsData[index];

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

if (!customElements.get("thai-reading-phrases")) {
  customElements.define("thai-reading-phrases", ThaiReadingPhrases);
}
