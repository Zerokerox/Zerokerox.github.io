class ThaiSaraTitle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

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
    const headerAudio = this.getAttribute("header-audio") || "";

    const sara = this.getAttribute("sara") || "ู";
    const saraName = this.getAttribute("sara-name") || "สระอู";
    const example = this.getAttribute("example") || "งู";
    const reading = this.getAttribute("reading") || "งอ อู งู";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          min-width: 0;
          margin: 0;
          box-sizing: border-box;
        }

        * {
          box-sizing: border-box;
        }

        .book-container {
          width: 100%;
          background: #ffffff;
          border: 2px solid #8ba3c7;
          border-radius: 12px;
          padding: clamp(12px, 3vw, 20px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .header-box {
          text-align: center;
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

        .highlight {
          color: #2b5282;
          font-weight: bold;
        }

        .main-example {
          font-size: clamp(1.1rem, 3vw, 1.3rem);
          font-weight: bold;
          color: #c62828;
          margin-top: 8px;
        }

        .reading {
          color: #333;
          font-weight: normal;
          font-size: 0.9em;
        }

        .audio-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.3rem;
          padding: 4px;
        }

        .audio-btn:focus-visible {
          outline: 3px solid #2b5282;
          outline-offset: 3px;
          border-radius: 6px;
        }
      </style>

      <div class="book-container">
        <div class="header-box">

          <div class="badge">
            สระ ${sara}
          </div>

          <div class="sub-title">
            อ่านว่า <span class="highlight">${saraName}</span>
          </div>

          <div class="main-example">
            ${example}

            <span class="reading">
              อ่านว่า ${reading}
            </span>

            <button
              class="audio-btn"
              id="play-header"
              aria-label="เล่นเสียง ${example}"
              ${headerAudio ? "" : "disabled"}
            >🔊</button>

          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.shadowRoot
      .querySelector("#play-header")
      .addEventListener("click", () => {
        this.playAudio(this.getAttribute("header-audio") || "");
      });
  }

  disconnectedCallback() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }
}

if (!customElements.get("thai-sara-title")) {
  customElements.define("thai-sara-title", ThaiSaraTitle);
}
