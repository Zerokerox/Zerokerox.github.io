class ThaiSaraALesson extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.wordsData = [
      {
        word: "ขา",
        spell: "ขอ อา ขา",
        icon: "🦵",
        audio: "/Audio/สระอา/ขา.m4a",
      },
      {
        word: "ยา",
        spell: "ยอ อา ยา",
        icon: "💊",
        audio: "/Audio/สระอา/ยา.m4a",
      },
      {
        word: "ตา",
        spell: "ตอ อา ตา",
        icon: "👁️",
        audio: "/Audio/สระอา/ตา.m4a",
      },
      {
        word: "ลา",
        spell: "ลอ อา ลา",
        icon: "🐴",
        audio: "/Audio/สระอา/ลา.m4a",
      },
      {
        word: "ฝา",
        spell: "ฝอ อา ฝา",
        icon: "🥘",
        audio: "/Audio/สระอา/ฝา.m4a",
      },
      {
        word: "งา",
        spell: "งอ อา งา",
        icon: "🐘",
        audio: "/Audio/สระอา/งา.m4a",
      },
      {
        word: "นา",
        spell: "นอ อา นา",
        icon: "🌾",
        audio: "/Audio/สระอา/นา.m4a",
      },
      {
        word: "ทา",
        spell: "ทอ อา ทา",
        icon: "🖌️",
        audio: "/Audio/สระอา/ทา.m4a",
      },
    ];
    // 🫏
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  playAudio(src) {
    if (!src) return;

    // หยุดเสียงเดิมก่อนเล่นเสียงใหม่
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
    const headerAudio = this.getAttribute("header-audio") || "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: none;
          min-width: 0;
          margin: 0;
          box-sizing: border-box;
        }

        * {
          box-sizing: border-box;
        }

        .book-container {
          width: 100%;
          min-width: 0;
          background: #ffffff;
          border: 2px solid #8ba3c7;
          border-radius: 12px;
          padding: clamp(12px, 3vw, 20px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .header-box {
          text-align: center;
          margin-bottom: 20px;
        }

        .badge {
          display: inline-block;
          background: #f7ce92;
          color: #5d4037;
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          font-weight: bold;
          padding: 6px 24px;
          border-radius: 20px;
          margin-bottom: 12px;
        }

        .sub-title {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #455a64;
          margin: 4px 0;
        }

        .main-example {
          font-size: clamp(1.1rem, 3vw, 1.3rem);
          font-weight: bold;
          color: #c62828;
          margin-top: 8px;
        }

        .highlight {
          color: #2b5282;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(8px, 2vw, 12px);
          border: 2px solid #6b82a8;
          padding: clamp(8px, 2vw, 10px);
          border-radius: 8px;
          background: #fafafa;
        }

        .card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          min-width: 0;
          background: #ffffff;
          border: 1px solid #d0d7de;
          border-radius: 8px;
          padding: clamp(10px, 2vw, 14px);
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .card:active {
          transform: scale(0.97);
          background: #eef3f8;
        }

        .card-text {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: bold;
          color: #c62828;
        }

        .card-icon {
          font-size: clamp(1.5rem, 4vw, 2.2rem);
        }

        .audio-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.3rem;
          padding: 4px;
        }

        .audio-btn:focus-visible,
        .card:focus-visible {
          outline: 3px solid #2b5282;
          outline-offset: 3px;
        }

        @media (max-width: 360px) {
          .grid-container {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="book-container">
        <div class="header-box">
          <div class="badge">สระ -า</div>

          <div class="sub-title">
            อ่านว่า <span class="highlight">สระอา</span>
          </div>

          <div class="main-example">
            กา
            <span style="color:#333;font-weight:normal;font-size:0.9em">
              อ่านว่า กอ อา กา
            </span>
            <button
              class="audio-btn"
              id="play-header"
              aria-label="เล่นเสียงคำว่า กา"
              ${headerAudio ? "" : "disabled"}
            >🔊</button>
          </div>
        </div>

        <div class="grid-container">
          ${this.wordsData
            .map(
              (item, index) => `
            <button
              class="card"
              type="button"
              data-index="${index}"
              aria-label="เล่นเสียง ${item.word}"
              ${item.audio ? "" : "disabled"}
            >
              <span class="card-text">${item.word}</span>
              <span class="card-icon">${item.icon}</span>
            </button>
          `,
            )
            .join("")}
        </div>
      </div>
    `;

    this.headerAudio = headerAudio;
  }

  bindEvents() {
    this.shadowRoot
      .querySelector("#play-header")
      .addEventListener("click", () => {
        this.playAudio(this.headerAudio);
      });

    this.shadowRoot.querySelectorAll(".card").forEach((card) => {
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

customElements.define("thai-sara-a-lesson", ThaiSaraALesson);
