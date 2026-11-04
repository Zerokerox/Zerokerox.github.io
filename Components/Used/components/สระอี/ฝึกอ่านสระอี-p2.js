class ThaiReadingPhrases extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // ข้อมูลรูปภาพด้านบน
    this.imagesData = [
      {
        word: "กีฬา",
        spell: "สอ อา ศา / ลอ อา ลา",
        image:
          "https://th.bing.com/th/id/OIP.Skl1er9BLvjXH21w3cZ8cgHaE7?w=273&h=182&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ทาสี",
        spell: "ฝอ อา ฝา / กอ อา กา",
        image:
          "https://th.bing.com/th/id/OIP.08ULnszp1OTAI8olJOq5DgHaE8?w=264&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ฝาชี",
        spell: "ทอ อา ทา / ยอ อา ยา",
        image:
          "https://th.bing.com/th/id/OIP.i88YmogGcih5RapmeklNbgHaHa?w=203&h=203&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
    ];

    // ข้อมูลคำศัพท์ 12 คำ
    this.wordsData = [
      { word: "กีฬา", spell: "ตอ อา ตา / ออ อา อา", audio: "" },
      { word: "นาที", spell: "ฝอ อา ฝา / กอ อา กา", audio: "" },
      { word: "ตาดี", spell: "มอ อา มา / หอ อา หา", audio: "" },

      { word: "อีกา", spell: "ปอ อา ปา / กอ อา กา", audio: "" },
      { word: "นารี", spell: "ยอ อา ยา / ชอ อา ชา", audio: "" },
      { word: "สีดา", spell: "คอ อา คา / ถอ อา ถา", audio: "" },

      { word: "มีนา", spell: "วอ อา วา / จอ อา จา", audio: "" },
      { word: "พาที", spell: "สอ อา ศา / ลอ อา ลา", audio: "" },
      { word: "ลีลา", spell: "มอ อา มา / นอ อา นา", audio: "" },

      { word: "ฝาชี", spell: "ออ อา อา / สอ อา สา", audio: "" },
      { word: "ชาลี", spell: "รอ อา รา / คอ อา คา", audio: "" },
      { word: "ทาสี", spell: "ทอ อา ทา / ยอ อา ยา", audio: "" },
    ];
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  // เล่นเสียง
  playAudio(src) {
    if (!src) return;

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
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        /* รูปภาพด้านบน */
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

        /* รูปภาพแทน Emoji */
        .img-icon {
          width: clamp(60px, 12vw, 100px);
          height: clamp(60px, 12vw, 100px);
          object-fit: contain;
          display: block;
          margin-bottom: 6px;
          border-radius: 8px;
        }

        .img-text {
          font-size: clamp(0.9rem, 2.5vw, 1.3rem);
          font-weight: bold;
          color: #2b5282;
        }

        /* ตารางคำศัพท์ */
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
              <img
                class="img-icon"
                src="${item.image}"
                alt="${item.word}"
                loading="lazy"
              >
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
