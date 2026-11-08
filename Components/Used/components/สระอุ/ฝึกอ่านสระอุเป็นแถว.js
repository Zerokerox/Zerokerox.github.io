class ThaiReadingLessonPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.currentAudio = null;

    // ข้อมูลรูปภาพและประโยค
    this.sectionsData = [
      {
        type: "illustrated-sentences",
        items: [
          {
            id: "item-1",
            imageSrc: "/Images/สระอุ/img 1.png",
            imageAlt: "ตาสา ดุ",
            sentences: [
              {
                fullText: "ตาสา ดุ",
                audioSrc: "audio/ekaa_tee_ngoo.mp3",
                words: [
                  { text: "ตาสา", audioSrc: "audio/ekaa.mp3" },
                  { text: "ดุ", audioSrc: "audio/ekaa.mp3" },
                ],
              },
            ],
          },
          {
            id: "item-2",
            imageSrc: "/Images/สระอุ/img 2.png",
            imageAlt: "ตา ตี งู ดุ",
            sentences: [
              {
                fullText: "ตา ตี งู ดุ",
                audioSrc: "audio/ekaa_tee_ngoo.mp3",
                words: [
                  { text: "ตา", audioSrc: "audio/ekaa.mp3" },
                  { text: "ตี", audioSrc: "audio/ekaa.mp3" },
                  { text: "งู", audioSrc: "audio/ekaa.mp3" },
                  { text: "ดุ", audioSrc: "audio/ekaa.mp3" },
                ],
              },
            ],
          },
          {
            id: "item-3",
            imageSrc: "/Images/สระอุ/img 3.png",
            imageAlt: "ฝา ผุ ทะลุ มี รู",
            sentences: [
              {
                fullText: "ฝา ผุ ทะลุ มี รู",
                audioSrc: "audio/ekaa_tee_ngoo.mp3",
                words: [
                  { text: "ฝา", audioSrc: "audio/ekaa.mp3" },
                  { text: "ผุ", audioSrc: "audio/ekaa.mp3" },
                  { text: "ทะลุ", audioSrc: "audio/ekaa.mp3" },
                  { text: "มี", audioSrc: "audio/ekaa.mp3" },
                  { text: "รู", audioSrc: "audio/ekaa.mp3" },
                ],
              },
            ],
          },
          {
            id: "item-4",
            imageSrc: "/Images/สระอุ/img 4.png",
            imageAlt: "อา มี สุรา ราคา ดี",
            sentences: [
              {
                fullText: "อา มี สุรา ราคา ดี",
                audioSrc: "audio/ekaa_tee_ngoo.mp3",
                words: [
                  { text: "อา", audioSrc: "audio/ekaa.mp3" },
                  { text: "มี", audioSrc: "audio/ekaa.mp3" },
                  { text: "สุรา", audioSrc: "audio/ekaa.mp3" },
                  { text: "ราคา", audioSrc: "audio/ekaa.mp3" },
                  { text: "ดี", audioSrc: "audio/ekaa.mp3" },
                ],
              },
            ],
          },
          {
            id: "item-5",
            imageSrc: "/Images/สระอุ/img 5.png",
            imageAlt: "มี พายุ มา",
            sentences: [
              {
                fullText: "มี พายุ มา",
                audioSrc: "audio/ekaa_tee_ngoo.mp3",
                words: [
                  { text: "มี", audioSrc: "audio/ekaa.mp3" },
                  { text: "พายุ", audioSrc: "audio/ekaa.mp3" },
                  { text: "มา", audioSrc: "audio/ekaa.mp3" },
                ],
              },
            ],
          },
        ],
      },
    ];

    this.render();
  }

  connectedCallback() {
    this.bindEvents();
  }

  playAudio(src) {
    if (!src) return;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    this.currentAudio = new Audio(src);

    this.currentAudio.play().catch((err) => {
      console.warn("ไม่สามารถเล่นไฟล์เสียงได้:", src);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          box-sizing: border-box;
          container-type: inline-size;
        }

        .page-card {
          background: #ffffff;
          border: 2px solid #b0bec5;
          border-radius: 12px;
          padding: 5cqi 4cqi;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          width: 100%;
          box-sizing: border-box;
        }

        /* รายการรูปภาพและข้อความ */
        .illustrated-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .illustrated-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 1.5rem;
          align-items: center;
        }

        @container (max-width: 480px) {
          .illustrated-row {
            grid-template-columns: 100px 1fr;
            gap: 0.8rem;
          }
        }

        .image-container {
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e0e0e0;
          background-color: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lesson-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .sentences-container {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .sentence-block {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
        }

        .word-item {
          font-size: clamp(1.4rem, 5cqi, 2.2rem);
          font-weight: 500;
          color: #37474f;
          padding: 2px 6px;
          border-radius: 6px;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .word-item:hover {
          background-color: #e3f2fd;
          color: #1565c0;
        }

        .word-item:active {
          transform: scale(0.96);
        }

        .play-sentence-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: clamp(1rem, 3cqi, 1.3rem);
          padding: 2px 6px;
          border-radius: 50%;
          opacity: 0.7;
          transition: opacity 0.2s, transform 0.1s;
        }

        .play-sentence-btn:hover {
          opacity: 1;
          transform: scale(1.1);
        }
      </style>

      <div class="page-card">

        <div class="illustrated-list">
          ${this.sectionsData[0].items
            .map(
              (item) => `
                <div class="illustrated-row">
                  <div class="image-container">
                    <img
                      class="lesson-img"
                      src="${item.imageSrc}"
                      alt="${item.imageAlt}"
                      loading="lazy"
                    />
                  </div>

                  <div class="sentences-container">
                    ${item.sentences
                      .map(
                        (s) => `
                          <div class="sentence-block">
                            ${s.words
                              .map(
                                (w) => `
                                  <span
                                    class="word-item"
                                    data-audio="${w.audioSrc}"
                                  >${w.text}</span>
                                `,
                              )
                              .join("")}

                            <button
                              class="play-sentence-btn"
                              data-audio="${s.audioSrc}"
                              title="ฟังทั้งประโยค"
                            >🔊</button>
                          </div>
                        `,
                      )
                      .join("")}
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>

      </div>
    `;
  }

  bindEvents() {
    const clickableElements = this.shadowRoot.querySelectorAll("[data-audio]");

    clickableElements.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();

        const audioSrc = el.getAttribute("data-audio");

        if (audioSrc) {
          this.playAudio(audioSrc);
        }
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

if (!customElements.get("thai-reading-lesson-page")) {
  customElements.define("thai-reading-lesson-page", ThaiReadingLessonPage);
}
