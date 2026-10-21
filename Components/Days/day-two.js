import dayTwoData from "../Used/data/day-two-data.js";

class DayTwo extends HTMLElement {
  connectedCallback() {
    const charList = dayTwoData
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
      <summary><h1 style="display: inline-block">Day 2</h1></summary>
      <ol>
      ${charList}
    </ol>
    </details>
    
    
        `;
  }
}

customElements.define("my-day-two", DayTwo);
