class ThaiReadingPhrases2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // ข้อมูลคำศัพท์ 12 คำ
    this.wordsData = [
      { word: "ในใจ", audio: "" },
      { word: "ใดใด", audio: "" },
      { word: "ใจดี", audio: "" },
      { word: "มีใย", audio: "" },
      { word: "ตาใส", audio: "" },
      { word: "ใบชา", audio: "" },
      { word: "ในโถ", audio: "" },
      { word: "ยาใจ", audio: "" },
      { word: "ใบลา", audio: "" },
      { word: "ในกา", audio: "" },
      { word: "สีใด", audio: "" },
      { word: "ใสดี", audio: "" },
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

        <!-- ตารางคำศัพท์ 12 คำ -->
        <div class="grid-container">
          ${this.wordsData
            .map(
              (item, index) => `
            <button
              type="button"
              class="word-card"
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
    const cards = this.shadowRoot.querySelectorAll(".word-card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const index = Number(card.dataset.index);
        this.playAudio(this.wordsData[index].audio);
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

if (!customElements.get("thai-reading-phrases2")) {
  customElements.define("thai-reading-phrases2", ThaiReadingPhrases2);
}
