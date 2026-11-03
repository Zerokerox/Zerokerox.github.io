class ThaiHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const firstTitle = this.getAttribute("first-title") || "Si";
    const lastTitle = this.getAttribute("last-title") || "Htoung";
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        :host {
          display: block;
          position: relative;
          z-index: 10;
          background: #0b1020;
          color: #f8f7f4;
          font-family: 'DM Sans', sans-serif;
        }

        * { box-sizing: border-box; }

        a {
          color: inherit;
          text-decoration: none;
        }

        .navbar {
          min-height: 86px;
          padding: 20px 8%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 21px;
          font-weight: 700;
          white-space: nowrap;
        }

        .logo-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg,#f5d999,#c68a3b);
          border-radius: 13px;
          color: #171627;
          font-size: 25px;
        }

        .gold { color: #edc77a; }

        nav {
          display: flex;
          gap: 30px;
        }

        nav a {
          color: #a9b2c7;
          transition: color .3s;
        }

        nav a:hover { color: #edc77a; }

        .nav-button {
          border: 1px solid rgba(237,199,122,.5);
          padding: 12px 19px;
          border-radius: 30px;
          font-size: 13px;
          transition: .3s;
          white-space: nowrap;
        }

        .nav-button:hover {
          background: #edc77a;
          color: #0b1020;
          transform: translateY(-3px);
        }

        
        @media (max-width: 600px) {
          .navbar {
            padding: 20px 5%;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 18px;
          }

          .logo {
            font-size: 20px;
            gap: 8px;
            justify-content: center;
          }

          .logo-icon {
            width: 36px;
            height: 36px;
            font-size: 22px;
          }

          nav {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 14px;
            width: 100%;
          }

          nav a {
            font-size: 15px;
            padding: 5px;
          }

          .nav-button {
            padding: 11px 20px;
            font-size: 13px;
            text-align: center;
          }
        }

      </style>

      <header class="navbar">
        <a href="#home" class="logo" data-target="home">
          <span class="logo-icon">ก</span>
          <span>${firstTitle}<span class="gold">${lastTitle}</span></span>
        </a>

        <nav aria-label="Main navigation">
          <a href="../../../index.html">Home</a>
          <a href="#about" data-target="about">About</a>
          <a href="#lessons" data-target="lessons">Lessons</a>
        </nav>

        <a href="#lessons" class="nav-button" data-target="lessons">
          Start Learning ↗
        </a>
      </header>
    `;

    this.shadowRoot.addEventListener("click", (event) => {
      const link = event.target.closest("a[data-target]");
      if (!link) return;

      event.preventDefault();

      this.dispatchEvent(
        new CustomEvent("thai-bloom-navigate", {
          detail: { target: link.dataset.target },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }
}

if (!customElements.get("thai-header")) {
  customElements.define("thai-header", ThaiHeader);
}
