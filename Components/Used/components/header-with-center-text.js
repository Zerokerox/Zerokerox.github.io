class ThaiHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const firstTitle = this.getAttribute("first-title") || "Ti";
    const lastTitle = this.getAttribute("last-title") || "tle";

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

        * {
          box-sizing: border-box;
        }

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
  position: relative;
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

        .gold {
          color: #edc77a;
        }

        .welcome-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 22px;
  font-weight: 600;
  color: #f8f7f4;
  letter-spacing: .5px;
  white-space: nowrap;
}

        @media (max-width: 600px) {
  .navbar {
    padding: 18px 5%;
  }

  .logo {
    font-size: 18px;
    gap: 8px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
  }

  .welcome-text {
    font-size: 16px;
  }
}
      </style>

      <header class="navbar">

        <!-- Logo Left -->
        <a href="index.html" class="logo">
          <span class="logo-icon">ก</span>
          <span>
            Si<span class="gold">Htoung</span>
          </span>
        </a>

        <!-- Welcome Right -->
        <div class="welcome-text">
        ${firstTitle}<span class="gold">${lastTitle}</span>
        </div>

      </header>
    `;
  }
}

if (!customElements.get("thai-header")) {
  customElements.define("thai-header", ThaiHeader);
}
