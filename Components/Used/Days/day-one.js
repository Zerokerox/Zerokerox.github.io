import dayOneData from "../data/day-one-data.js";
import "../Cards/char-card-with-link-style.js";
import "../Templates/expandable-section.js";

class DayOne extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const charList = dayOneData
      .map((char) => {
        return `
      <li>
          <my-char-card-with-link-style
            title-char="${char.titleChar}"
            reading-sound="${char.readingSound}"
            youtube-link="${char.youtubeLink}"
          ></my-char-card-with-link-style>
        </li>`;
      })
      .join("");

    this.shadowRoot.innerHTML = `
    <my-expandable-section content-title="Day 1" >
    <ol slot="detail">${charList}</ol>
    </my-expandable-section>
        `;
  }
}

customElements.define("day-one", DayOne);
