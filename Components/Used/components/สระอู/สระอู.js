class ThaiSaraLesson extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.wordsData = [
      {
        word: "ปู",
        image:
          "https://th.bing.com/th/id/OIP.CY72_4z7eJYxBgncKmnvAQHaHa?w=201&h=201&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "รู",
        image:
          "https://th.bing.com/th/id/OIP.2QrEVhw7sZMCjQycLkCbAgHaEK?w=291&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ดู",
        image:
          "https://th.bing.com/th/id/OIP.gcVr2nZ-Jaa3QziikazwFgHaEO?w=284&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "หู",
        image:
          "https://th.bing.com/th/id/OIP.rOJRtxyl9Mq6-I0J_VEOdQHaHa?w=169&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "คู",
        image:
          "https://th.bing.com/th/id/OIP.AC_nPP2yxMxmSW78IkxvowHaE8?w=237&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ถู",
        image:
          "https://th.bing.com/th/id/OIP.4kx2a_VpyFmOvLPtqjZ7cgHaE7?w=300&h=200&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "งู",
        image:
          "https://images.unsplash.com/photo-1633081528930-91c8cc07f3d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        audio: "",
      },
      {
        word: "ชู",
        image:
          "https://th.bing.com/th/id/OIP.kvpd8KrmUj1kG8fVkB0BywHaEJ?w=299&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
    ];
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
          min-height: 100px;
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

        /* Image */
        .card-image {
          width: clamp(55px, 12vw, 85px);
          height: clamp(55px, 12vw, 85px);
          object-fit: contain;
          flex-shrink: 0;
          border-radius: 8px;
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
          <div class="badge">สระ - ู</div>

          <div class="sub-title">
            อ่านว่า <span class="highlight">สระอู</span>
          </div>

          <div class="main-example">
            งู
            <span style="color:#333;font-weight:normal;font-size:0.9em">
              อ่านว่า งอ อู งู
            </span>
            <button
              class="audio-btn"
              id="play-header"
              aria-label="เล่นเสียงคำว่า สี"
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

              <img
                class="card-image"
                src="${item.image}"
                alt="${item.word}"
                loading="lazy"
              />
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

customElements.define("thai-sara-lesson", ThaiSaraLesson);
