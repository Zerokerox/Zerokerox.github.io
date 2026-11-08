class ThaiReadingPhrases extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.imagesData = [
      {
        word: "มะลิ",
        image:
          "data:image/webp;base64,UklGRmQNAABXRUJQVlA4IFgNAACwWQCdASrsALQAPp1Amkklo6KmLjZrmMATiUESBLxnjvond5PRnwCI924ru8Gl916I6QWP+vrci0g1hVe3wRF6Ti524Gs5s2PyhL8kMX05fUErUDf+g5/7RWHi/4N6BuAcMMmNnIHt1/0fBxco/4+eIV8+cpZ4xPdpd+Bmt2LJyHcNsbgAtkmucUgPW4gcB9s5xAYPZtD097Adz7tu6RVbRhjB6hpx3J2+S847EI9/eq1W9WiVwWOC4/wHPt7hlsSWM7oxV80o3epfP+8XkrtK6N/w8hyauGwxYB9WKFWvIRu1A6/Md58coJt2jv9ckhnr6ah3rohTvNWnFNslDAIX/aSl43MKm8X7QwSxoFzb/uGtpKAQxeyBkSH7jMnCE6XPse4PK2iCmogzC7gzAnDj6pKp44gVGU+y2orV/0KbR03AkhbXkSwi5dY5nf5YBiKmwTTOUWixKqnSS47KIhctPCt+28b+ldjhG5zsslRX2hFffOfMz42JUbVe+hJvDSDutHyeurCC94N2l1bx2FF1u7HXs8GiwAQ4+QUmPQqdp7Vv7Ap15FXJkqOcwb4VEHGgkA9ndPmmC/TIoznNShjS1vXuTyaVRAE6Lq7mT3oqIxwi0HAXV0XYOcpRBn8azKq4aByBSzCfC6wsf+++jNqhGV/7TTXjfBygRnD8Qv1/18DpU4NBjVNETU3xAg+xTSlU/Gx6nULrgHoA5NvLhS7VJsDnOTj8/wDbtrt0c8Q/31mmQN4/kNHKPU+cwY1nX0ih7hRIi1xyN2kusIAAcsn8LM5PUb2Ev/nVZTZOzObg0X39Dz2t9+kcek1p0Cb8lDu2mg2zxuM5cHRBdkRGgLP5fzthi+oA4kjxuuDDchvxDKG3TrBuwYsrBeP+j71POIzqzR2joayfaduIZO2RmyI4TrGDu5NBkTjDRfybcPFdGHcCSLKkdu80i1ZyLkK7vTTHeiGNRgAA/slQg7R+rszpQP/+QQv8DU+TB7C8DGNizvjOCZHtY8rDudCq8XX44AUVt8vIBHwhIcP0gjsLTVWqvOlkImNNGNs2OYrGCgZMROoJ2l7N5mblOrDQxooCrzfKbGEqjVipmIvZtAWqxds/4lL7wEjWALOjw3abOb53SA4BbMHtTV17LScei5xt592wqfaSQig58lw84zIit4dCUdBfIb4h5yZr56JH1eluojevU9rhgamNWbY+kDD9qqQiY8uJ7JubytMdpI44qIOidSCSx9Tihw3+Zflftb3xVlhnQrBxveW9IgMuBIFpbHpK3+1RXFad2ghgA2Si2cZUkFmSayVJi+A620y1e7KNdg0deGfJPR/am8m+OrbLl69vC9EUzqCejYZ1jV5WTJcljHe8rSEheAWD3zlc4ZiEqSPSCIt7e8UXhZXL5x5LHYy1TuVhb8WJEyXo5ZrJNZV5uGxQctHbiFmiVDb9Xambw1f242WmtOnuCWlLMbMpP5b0C31bbZWUIoqCTfT+xU0pIAZwOrA+GApfl9Jj4hZkApc0EvoLB7ZUtdjKlNS2gDp+yyaAdGvtC9mduPfJvR2SZCwATjjRT4wCnOTltmlGIqhNeYU5F1SovdwmSUKyxXmVdczr4WX/PmEwPQbIX5QfbDAYuCU6TVxlvf4MSXt+XWBeixLsdR33ZQrClf41WXBn87i2d3UHH3czPn9nzWRIGcdjHba0soAqBHWHfrn/2GJR2kFK7WWPMBV8M8MaYeQTPnooEyY3sbCewnJp+cX+eOi+uZJ+ntGG7eDNuRjj+dq6/M7VQ0wIyhmWrPIeG2JrX4SLRJCYazQb0cLVaVZ/pd9c7sI/cidnxSeog07s3UUKeXL+L0UxFtT4gnzCfIb9HM0ba6rEh1V86jUFv4/1mg1ODl6E5eCn0H6xvU4MoI+CR+pc6zqvidRUXChY5HZn3C7TivCi2T4SK4qmQMUdkzdsfzo3vyfvfCJYNIfwmv2//vdjShQg5l4mgR3vOjHUL1GKODYUcQYU+wR3WuZBuaz1HRKn8ycJ/yI6BXiMzvIcP9ibOLnkCHzQ2aFPQ1fINlTerHQUf6FCukED+Go7QmPk6HxHDP25gJKXRaEz1slSLqCSFLUt2Drbozy/BXfwXE7Zp24+riIohw8MvIjjVUcQNtipfFUvQFEfaou6VndqfBmKVHO+Vbu+J4bViO3VKiK2o4T8LklI2TNbZYOXqn+P3HXEN3UiBsgMQsw/+LQO1RE1z1dQMNnglmeC95gieAJzh+vJhzad7vWPFZfFM3fvNuFYcgzHn56ZoaCmqtFAsqEm9aG5Dpi/QvR/uo4VOazeeKtDyWG+q3XnY+T8+PoQ+1Lgo1Z71Y9U8M6BcG+IScvWoEHGtptXTGJNrDCBJ3WJenxapdWYjsiZCAz6IqA4AoB4vlJNv6q6wYEQFlNDu2tSan3Gdh5T5pOUrTY/csBmNE/re75NWf7yZ+eGVkIt8E9auxX7E8Mkvm7E513PHO+kYJS9jNrRkFuDwskZUgj2aK/5550nH1dP2XiDfep1sp08aY8lTrrBUP95RTmZW2RJ0SLQmGciJ6Sh5G3EC87jXVZBwQk1ZkyuXpfcIsPKwEmvHYICOL1tQKYfpV2VxS5cAEbTtLdrYTViyd5t2oZRT7v40Omv76rF/O2qTXVgODVns9RbMg2SnNtIPwFzJEUU/lAwyacgaESrdnTB4vvjuWQB76BEupJtuWp8IZdXVTxSzSZKP5JWIk/+q62j2Ocmd1nNWWEqbPrpqwqcpb/kdMNHt9QKj8LvDY/j1kPpH7+MUH14slO4CPVlC1Uz3ZqCAm1tgoRzTHzzm8v7+0uS/+/7KO8bwbvAjR4w8zcJPUgsWDF0QvRtAktOyw54BATXti3HtCIa2RUUnX473TVwhePLbD1btNSwan7gt9glW/7oF7oFqQLkDng/TcNmir3AcYJ7IUImQ/9+t1k0WXNBpdHMKJziwpKpO2YxPL7o/FFbEWwQNb10cv1dQryBrE1rkcX6nZWzy2ooytwaXcwyZdNlSSMsgxE/9To+6NdiBCWFXSlcQNTTpu8ZPiQ9yVw2gjXAF+Fw++HeY355dQiEpCGqCwAi9CYjPJ2Y7naW1K/+PazxY704MqJdXr9yPiiNf0X/0CorpG42AzETTvWDp3aIh7D3lSyHAkRtUbKMcPAGoiEQ41TAdpB5yF5MJ6Zk5ncR1pOOgT885ui1/EPx7SPuSs/Wdsopk7vbeC3U0kVmw8TLCu8NaR9PFUzjD+7Hict7AZNc5AzEkRnyGRIaOUEIV+SPVT1XOW0LvnvuIhyPRg9oQwH9jHblvRrBk2DBnt7fKyfjD07AQyKJZrFo7YsaYXjQdGb+rB/zRGvJ2SnI+/GhXRu4hjCVQi/zWbOr2IOJPArnHLYkemMAaXXqkmB1LSrK3bjvZO31BOhesRANU6TVnZxtNbMoHf4FzXKR9lJ1xApo/z8FxOtnrXXmp2lHMHIGZJPpMk7WkyCCPTTRr9LPRUiLYCPnJEz59+PhrAOiw2vDix6S6RixVYqvzW9eXf04T1CcEeK7NSFzodTEwpbVs6AfL4aXXem7d8EDNVVt5az59eWgSYTk7TMdH/Cy5+DZnVM8vhIC+Z7aIGnM7Bdu1PfCImjV3Al+0ZkKArjsLMP6KAGUIOeAbnx1YEWMF4ZcYhcPkjbZ4HPk2wrJOyMZUVVoxtVOvE177GwuIHg2AIb4ST/AI2/0QROgPIjH4AUA7HvrFt2nD02ALCaXTJobXH2z7DPiepdDe8CbkIi0WuqCwrX2aoYFMLUM8qx5ciY2+hxDKlQninnW/DKtMrnGrFZpa8kYWl5JW9dN8PthfGqPOjUJ6UnIqt3xLNL5Umdtp6davmFnw2FsO55qIdgoKjeeuYRlWpDHOwK6lZ33Cxfp3N727xQVOBPSjcojVKvDk7rKL3u4+7zTjVSmg/3FuVz9w0/VbCUE4sMrldDXpVQMsiPALgk8DJtz5mhmRsbxLvQxXyYnOW1u3HsHNw1b6dR/u6l9dm58Jh+6/7jjksZREmMUSF+HspOeUYT7hz9CIxU3VM6ZpRWz8wk3C2tkgZrWi5TrULGHRakzaMtNy9Q4JuWFbslfNWWc8mM3zHxt5xINFdOdCgg19WAIXrqKFnNQExAL90IhzvnwxfO6br2zSxwuEXUgcIE/8IEngvJgstr6r2ZIlK0bTw/8Ixk8aHDFfUPrvrbVkkPgYpX167uhV0VLumEN+8n37iLLx7rWFQmIlYmELi0/zMEUpjq7qLCkVHx4ovKU0mrFZjv3VGYxAUV0HOGm+UBRCtVnekT4vIgHfbQ0eMWHJvlCAhM+GuCIg0NJWceQTAo0nPJI/hUulzIXA7w3pBYhu3TQx8G0s6eDazkMXnVFiOM4z8i0JiqTXYh4OA4lYjTsNLIeB2KHXs9/GFzZGPBcrokbYWvHErawVqAJ5uV752QOg83remHID3O09GkInQD6hWAqtUFWk3CGsROea7arzR19Jxk1oqGnFOjvbTux9qUiULy4gqACHMU+p+bwiTmtJDFO5Y9cma8135U7ZoHu7sgAAA==",
        audio: "",
      },
      {
        word: "กะทิ",
        image:
          "https://th.bing.com/th/id/OIP.4ljn7GeKliLyb_N8LE9AsAHaHa?w=168&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        audio: "",
      },
      {
        word: "บิดา",
        image:
          "https://th.bing.com/th/id/OIP.mZOXoO77mKcPoNIuV1bHPQHaDR?w=330&h=154&c=7&r=0&o=7&pid=1.7&rm=3",
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
