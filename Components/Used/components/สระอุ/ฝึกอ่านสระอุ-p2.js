class ThaiReadingPhrases extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.imagesData = [
      {
        word: "งูดุ",
        image:
          "https://th.bing.com/th/id/OIP.KVcsiabze2Q23s0lZveyOwHaD5?w=334&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ทะลุ",
        image:
          "https://th.bing.com/th/id/OIP.K-NSXPXcODmulWG-phPIsgHaEY?w=216&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "พายุ",
        image:
          "https://th.bing.com/th/id/OIP.Y-VY1ZMRLf-PXm08T6eo5QHaEK?w=290&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "กระชุ",
        image:
          "https://th.bing.com/th/id/OIP.1jQXzYYFvSS-h3NSi3A3nQHaJ4?w=132&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "ผุ",
        image:
          "https://th.bing.com/th/id/OIP.jH9u225gJW-39UW7fFRVmQHaHa?w=158&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "จุ",
        image:
          "https://th.bing.com/th/id/OIP.NZcu5BMKcdR8dvjXOBRh8QHaNK?w=187&h=333&c=7&r=0&o=7&pid=1.7&rm=3",
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

        .top-images-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(6px, 2vw, 10px);
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

        .image-card:focus-visible {
          outline: 3px solid #438258;
          outline-offset: 2px;
        }

        //ขยายภาพ

        .img-icon {
          width: clamp(60px, 12vw, 100px);
          height: clamp(60px, 12vw, 100px);
          object-fit: contain;
          display: block;
          margin-bottom: 6px;
          border-radius: 8px;

          transition: transform 0.3s ease;
          transform-origin: center center;
          position: relative;
          z-index: 1;
        }

        /* ขยายภาพ 300% เมื่อ Hover */
        .image-card:hover .img-icon {
          transform: scale(3);
          z-index: 100;
        }
      </style>

      <div class="book-container">
        <div class="top-images-grid">
          ${this.imagesData
            .map(
              (item, index) => `
            <button
              type="button"
              class="image-card"
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
      </div>
    `;
  }

  bindEvents() {
    const cards = this.shadowRoot.querySelectorAll(".image-card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const index = Number(card.dataset.index);
        this.playAudio(this.imagesData[index].audio);
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
