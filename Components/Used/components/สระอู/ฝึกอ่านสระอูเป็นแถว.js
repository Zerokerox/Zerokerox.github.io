class ThaiReadingLessonPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.currentAudio = null;

    // ข้อมูลบทเรียน พร้อมระบุ imageSrc และ audioSrc
    this.sectionsData = [
      {
        type: "illustrated-sentences",
        items: [
          {
            id: "item-1",
            imageSrc: "/Images/สระอู/crow-vs-snake.jpg", // ใส่ path รูปภาพของคุณตรงนี้
            imageAlt: "อีกา ตี งู",
            sentences: [
              {
                fullText: "อีกา ตี งู",
                audioSrc: "audio/ekaa_tee_ngoo.mp3",
                words: [
                  { text: "อีกา", audioSrc: "audio/ekaa.mp3" },
                  { text: "ตี", audioSrc: "audio/tee.mp3" },
                  { text: "งู", audioSrc: "audio/ngoo.mp3" },
                ],
              },
            ],
          },
          {
            id: "item-2",
            imageSrc: "/Images/สระอู/อาพาตามา.jpg", // ใส่ path รูปภาพของคุณตรงนี้
            imageAlt: "อา พา ตา มา ดู รูป",
            sentences: [
              {
                fullText: "อา พา ตา มา",
                audioSrc: "audio/aa_paa_taa_maa.mp3",
                words: [
                  { text: "อา", audioSrc: "audio/aa.mp3" },
                  { text: "พา", audioSrc: "audio/paa.mp3" },
                  { text: "ตา", audioSrc: "audio/taa.mp3" },
                  { text: "มา", audioSrc: "audio/maa.mp3" },
                ],
              },
              {
                fullText: "ดู รู ปู",
                audioSrc: "audio/doo_roo_poo.mp3",
                words: [
                  { text: "ดู", audioSrc: "audio/doo.mp3" },
                  { text: "รู", audioSrc: "audio/roo.mp3" },
                  { text: "ปู", audioSrc: "audio/poo.mp3" },
                ],
              },
            ],
          },
          {
            id: "item-3",
            imageSrc: "/Images/สระอู/ตาดูหูลา.jpg", // ใส่ path รูปภาพของคุณตรงนี้
            imageAlt: "ตา ดู หู ลา",
            sentences: [
              {
                fullText: "ตา ดู หู ลา",
                audioSrc: "audio/taa_doo_hoo_laa.mp3",
                words: [
                  { text: "ตา", audioSrc: "audio/taa.mp3" },
                  { text: "ดู", audioSrc: "audio/doo.mp3" },
                  { text: "หู", audioSrc: "audio/hoo.mp3" },
                  { text: "ลา", audioSrc: "audio/laa.mp3" },
                ],
              },
              {
                fullText: "หู ลา มี รู",
                audioSrc: "audio/hoo_laa_mee_roo.mp3",
                words: [
                  { text: "หู", audioSrc: "audio/hoo.mp3" },
                  { text: "ลา", audioSrc: "audio/laa.mp3" },
                  { text: "มี", audioSrc: "audio/mee.mp3" },
                  { text: "รู", audioSrc: "audio/roo.mp3" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "grid-words",
        words: [
          { text: "ลาดูงู", audioSrc: "audio/laa_doo_ngoo.mp3" },
          { text: "งูดูปู", audioSrc: "audio/ngoo_doo_poo.mp3" },
          { text: "รูงูมีงู", audioSrc: "audio/roo_mee_ngoo.mp3" },

          { text: "ตาตีงู", audioSrc: "audio/taa_tee_ngoo.mp3" },
          { text: "อาถูขา", audioSrc: "audio/aa_thoo_khaa.mp3" },
          { text: "ดูดีดี", audioSrc: "audio/doo_dee_dee.mp3" },

          { text: "ยาทาฝี", audioSrc: "audio/yaa_thaa_fee.mp3" },
          { text: "ตาชูปู", audioSrc: "audio/taa_choo_poo.mp3" },
          { text: "นามีปู", audioSrc: "audio/naa_mee_poo.mp3" },
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

            /* รายการส่วนบน */
            .illustrated-list {
              display: flex;
              flex-direction: column;
              gap: 2rem;
              margin-bottom: 2.5rem;
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

            .divider {
              height: 1px;
              background-color: #e0e0e0;
              margin: 2rem 0;
            }

            /* ตารางคำศัพท์ส่วนล่าง */
            .words-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1rem;
              row-gap: 1.5rem;
              text-align: center;
            }

            .grid-word-card {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0.8rem 0.4rem;
              background-color: #fafafa;
              border: 1px dashed #cfd8dc;
              border-radius: 8px;
              font-size: clamp(1.3rem, 4.5cqi, 2rem);
              font-weight: 500;
              color: #37474f;
              cursor: pointer;
              user-select: none;
              transition: all 0.15s ease;
            }

            .grid-word-card:hover {
              background-color: #e8f5e9;
              border-color: #66bb6a;
              color: #2e7d32;
            }

            .grid-word-card:active {
              transform: scale(0.95);
            }
          </style>

          <div class="page-card">
            <!-- ส่วนที่มีรูปภาพประกอบ -->
            <div class="illustrated-list">
              ${this.sectionsData[0].items
                .map(
                  (item) => `
                <div class="illustrated-row">
                  <div class="image-container">
                    <img class="lesson-img" src="${item.imageSrc}" alt="${item.imageAlt}" />
                  </div>
                  <div class="sentences-container">
                    ${item.sentences
                      .map(
                        (s) => `
                      <div class="sentence-block">
                        ${s.words
                          .map(
                            (w) => `
                          <span class="word-item" data-audio="${w.audioSrc}">${w.text}</span>
                        `,
                          )
                          .join("")}
                        <button class="play-sentence-btn" data-audio="${s.audioSrc}" title="ฟังทั้งประโยค">🔊</button>
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

            <div class="divider"></div>

            <!-- ส่วนตารางคำศัพท์ด้านล่าง -->
            <div class="words-grid">
              ${this.sectionsData[1].words
                .map(
                  (w) => `
                <div class="grid-word-card" data-audio="${w.audioSrc}">
                  ${w.text}
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
}

customElements.define("thai-reading-lesson-page", ThaiReadingLessonPage);
