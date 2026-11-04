class ThaiSaraALesson extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // ข้อมูลคำศัพท์จากแบบเรียน
    this.wordsData = [
      { word: "ขา", spell: "ขอ อา ขา", icon: "🦵" },
      { word: "ยา", spell: "ยอ อา ยา", icon: "💊" },
      { word: "ตา", spell: "ตอ อา ตา", icon: "👁️" },
      { word: "ลา", spell: "ลอ อา ลา", icon: "🫏" },
      { word: "ฝา", spell: "ฝอ อา ฝา", icon: "🥘" },
      { word: "งา", spell: "งอ อา งา", icon: "🐘" },
      { word: "นา", spell: "นอ อา นา", icon: "🌾" },
      { word: "ทา", spell: "ทอ อา ทา", icon: "🖌️" },
    ];

    this.render();
  }

  connectedCallback() {
    this.bindEvents();
  }

  speak(text) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "th-TH";
      utterance.rate = 0.85; // ความเร็วในการออกเสียง
      window.speechSynthesis.speak(utterance);
    } else {
      alert("เบราว์เซอร์ของคุณไม่รองรับการออกเสียง");
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              max-width: 500px;
              margin: 16px auto;
              padding: 16px;
              box-sizing: border-box;
            }

            .book-container {
              background: #ffffff;
              border: 2px solid #8ba3c7;
              border-radius: 12px;
              padding: 20px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            }

            /* ส่วนหัวแบบเรียน */
            .header-box {
              text-align: center;
              margin-bottom: 20px;
            }

            .badge {
              display: inline-block;
              background-color: #f7ce92;
              color: #5d4037;
              font-size: 1.6rem;
              font-weight: bold;
              padding: 6px 24px;
              border-radius: 20px;
              margin-bottom: 12px;
            }

            .sub-title {
              font-size: 1.2rem;
              color: #455a64;
              margin: 4px 0;
            }

            .main-example {
              font-size: 1.3rem;
              font-weight: bold;
              color: #c62828;
              margin-top: 8px;
            }

            .highlight {
              color: #2b5282;
            }

            /* ตารางคำศัพท์ */
            .grid-container {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              border: 2px solid #6b82a8;
              padding: 10px;
              border-radius: 8px;
              background-color: #fafafa;
            }

            .card {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: #ffffff;
              border: 1px solid #d0d7de;
              border-radius: 8px;
              padding: 10px 14px;
              cursor: pointer;
              transition: transform 0.1s ease, box-shadow 0.1s ease;
              user-select: none;
              -webkit-tap-highlight-color: transparent;
            }

            .card:active {
              transform: scale(0.97);
              background-color: #eef3f8;
            }

            .card-text {
              font-size: 2rem;
              font-weight: bold;
              color: #c62828;
            }

            .card-icon {
              font-size: 2.2rem;
            }

            /* ปุ่มเล่นเสียงหัวข้อ */
            .audio-btn {
              background: none;
              border: none;
              cursor: pointer;
              font-size: 1rem;
              vertical-align: middle;
            }
          </style>

          <div class="book-container">
            <div class="header-box">
              <div class="badge">สระ -า</div>
              <div class="sub-title">อ่านว่า <span class="highlight">สระอา</span></div>
              <div class="main-example">
                กา <span class="sub-title" style="color:#333; font-weight:normal;">อ่านว่า</span> กอ อา กา
                <button class="audio-btn" id="play-header">🔊</button>
              </div>
            </div>

            <div class="grid-container">
              ${this.wordsData
                .map(
                  (item) => `
                <div class="card" data-word="${item.word}" data-spell="${item.spell}">
                  <span class="card-text">${item.word}</span>
                  <span class="card-icon">${item.icon}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        `;
  }

  bindEvents() {
    // กดเล่นเสียงคำเกริ่นนำ
    const headerBtn = this.shadowRoot.querySelector("#play-header");
    if (headerBtn) {
      headerBtn.addEventListener("click", () => {
        this.speak("สระอา อ่านว่า สระอา. กา อ่านว่า กอ อา กา");
      });
    }

    // กดการ์ดคำศัพท์เพื่อฟังเสียงอ่านสะกด
    const cards = this.shadowRoot.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const word = card.getAttribute("data-word");
        const spell = card.getAttribute("data-spell");
        this.speak(`${word}. ${spell}. ${word}`);
      });
    });
  }
}

// ลงทะเบียน Custom Element
customElements.define("thai-sara-a-lesson", ThaiSaraALesson);
