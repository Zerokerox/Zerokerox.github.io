class MyHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>

      .welcome {
          padding: 30px 20px;
          text-align: center;
          font-family: Arial, sans-serif;
          background: linear-gradient(
            135deg, #080c1b, #191044, #001b35
          );
          border-radius: 16px;
        }
        h1 {
          color: #70f5ff;
          font-size: clamp(35px, 8vw, 70px);
          letter-spacing: 5px;
          text-shadow: 0 0 20px #00eaff;
          animation: glow 2s infinite alternate;
        }
      </style>

      <section class="welcome">
        <h1>WELCOME TO MY THAI COURSE</h1>
      </section>

      
    `;
  }
}

customElements.define("my-header", MyHeader);
