//glass UI

class ThaiHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const firstTitle = this.getAttribute("first-title") || "Ti";

    const lastTitle = this.getAttribute("last-title") || "tle";

    this.shadowRoot.innerHTML = `
      <style>
        @import url(
          'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap'
        );

        :host {
          display: block;
          position: relative;
          z-index: 10;
          width: 100%;

          font-family: 'DM Sans', sans-serif;

          color: #52647c;
        }

        * {
          box-sizing: border-box;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        /* =========================
           GLASS HEADER
        ========================= */

        .navbar {
          position: relative;

          min-height: 82px;
          width: 100%;

          padding: 14px clamp(16px, 5%, 60px);

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 24px;

          background: rgba(255,255,255,0.62);

          border-bottom:
            1px solid rgba(255,255,255,0.85);

          box-shadow:
            0 5px 22px rgba(70,85,130,0.06),
            inset 0 1px 1px rgba(255,255,255,0.9);

          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* =========================
           LOGO
        ========================= */

        .logo {
          display: flex;
          align-items: center;
          gap: 11px;

          font-size: 21px;
          font-weight: 800;

          white-space: nowrap;

          color: #52647c;

          transition: transform .2s ease;
        }

        .logo:hover {
          transform: translateY(-2px);
        }

        .logo-icon {
          display: grid;
          place-items: center;

          width: 44px;
          height: 44px;

          flex-shrink: 0;

          background:
            linear-gradient(
              135deg,
              #a18bd3,
              #7356a5
            );

          border: 1px solid rgba(255,255,255,0.7);

          border-radius: 15px;

          color: white;

          font-size: 25px;
          font-weight: 800;

          box-shadow:
            0 5px 15px rgba(115,86,165,0.23),
            inset 0 1px 2px rgba(255,255,255,0.35);
        }

        .brand-name {
          letter-spacing: -0.5px;
        }

        .gold {
          color: #8064b2;
        }

        /* =========================
           WELCOME TITLE
        ========================= */

        .welcome-text {
          position: absolute;

          left: 50%;
          transform: translateX(-50%);

          font-size: clamp(17px, 2vw, 22px);
          font-weight: 700;

          color: #52647c;

          letter-spacing: .3px;
          white-space: nowrap;
        }

        .welcome-text .highlight {
          color: #8064b2;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 600px) {

          .navbar {
            min-height: 0;

            padding: 15px 16px;

            flex-direction: column;
            justify-content: center;
            align-items: center;

            gap: 12px;
          }

          .logo {
            font-size: 19px;
            gap: 9px;
          }

          .logo-icon {
            width: 38px;
            height: 38px;
            font-size: 22px;
            border-radius: 13px;
          }

          .welcome-text {
            position: static;
            transform: none;

            width: 100%;

            font-size: 17px;
            line-height: 1.5;

            text-align: center;
            white-space: normal;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .logo {
            transition: none;
          }
        }
      </style>

      <header class="navbar">

        <!-- Logo -->
        <a href="/index.html" class="logo">

          <span class="logo-icon">ก</span>

          <span class="brand-name">
            Si<span class="gold">Htoung</span>
          </span>

        </a>

        <!-- Welcome -->
        <div class="welcome-text">
          ${this.escapeHTML(firstTitle)}<span class="highlight">${this.escapeHTML(lastTitle)}</span>
        </div>

      </header>
    `;
  }

  escapeHTML(value) {
    return String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  }
}

if (!customElements.get("thai-header")) {
  customElements.define("thai-header", ThaiHeader);
}
