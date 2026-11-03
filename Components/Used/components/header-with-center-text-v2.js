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
          flex-shrink: 0;
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

        /* Mobile Responsive */
        @media (max-width: 600px) {
          .navbar {
            min-height: auto;
            padding: 20px 5%;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
          }

          .logo {
            font-size: 18px;
            gap: 8px;
          }

          .logo-icon {
            width: 36px;
            height: 36px;
            font-size: 22px;
          }

          .welcome-text {
            position: static;
            transform: none;
            font-size: 17px;
            text-align: center;
            white-space: normal;
            width: 100%;
            line-height: 1.5;
          }
        }
      </style>

      <header class="navbar">

        <!-- Logo -->
        <a href="index.html" class="logo">
          <span class="logo-icon">ก</span>
          <span>
            Si<span class="gold">Htoung</span>
          </span>
        </a>

        <!-- Welcome -->
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
