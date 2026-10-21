import dayOneData from "../Used/data/day-one-data.js";

class DayOne extends HTMLElement {
  connectedCallback() {
    const charList = dayOneData
      .map((char) => {
        return `
      <li>
          <${char.tag}
            title-char="${char.titleChar}"
            reading-sound="${char.readingSound}"
            youtube-link="${char.youtubeLink}"
          ></${char.tag}>
        </li>`;
      })
      .join("");

    this.innerHTML = `
    <details>
      <summary><h1 style="display: inline-block">Day 1</h1></summary>
      <ol>
      ${charList}
    </ol>
    </details>
    
    
        `;
  }
}

customElements.define("day-one", DayOne);
