import dayTwoData from "../data/day-two-data.js";
import "../Cards/char-card-with-link-style.js";
import "../Templates/expandable-section.js";

class DayTwo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const charList = dayTwoData
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
    <my-expandable-section content-title="Day 2" >
    <ol slot="detail">
    ${charList}
    </ol>
    </my-expandable-section>
        `;
  }
}

customElements.define("my-day-two", DayTwo);
