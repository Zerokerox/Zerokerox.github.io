
class Menu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const targetUrl =
      this.getAttribute("target-url") || "index.html";

    const menuName =
      this.getAttribute("menu-name") || "Menu Name";

    const currentPage = window.location.pathname;

    const normalizePath = (path) => {
      try {
        return decodeURIComponent(
          new URL(path, window.location.href).pathname
        ).replace(/\/+$/, "") || "/";
      } catch {
        return path;
      }
    };

    const isActive =
      normalizePath(currentPage) === normalizePath(targetUrl);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

        .menu-link {
          position: relative;

          display: flex;
          align-items: center;

          width: 100%;
          min-height: 44px;

          padding: 11px 15px;

          border-radius: 13px;

          text-decoration: none;
          color: #52647c;

          font-family: inherit;
          font-size: 15px;
          font-weight: 600;

          background: rgba(255,255,255,0.28);

          border: 1px solid transparent;

          transition:
            background .22s ease,
            color .22s ease,
            transform .22s ease,
            box-shadow .22s ease,
            border-color .22s ease;

          cursor: pointer;
        }

        .menu-link:hover {
          background: rgba(255,255,255,0.78);

          border-color: rgba(255,255,255,0.9);

          color: #7356a5;

          transform: translateX(4px);

          box-shadow:
            0 4px 14px rgba(90,75,140,0.08),
            inset 0 1px 1px rgba(255,255,255,0.9);
        }

        /* Active Menu */

        .menu-link.active {
          color: #ffffff;

          background:
            linear-gradient(
              135deg,
              #9275c7,
              #7356a5
            );

          border-color: rgba(255,255,255,0.45);

          box-shadow:
            0 5px 16px rgba(115,86,165,0.22),
            inset 0 1px 1px rgba(255,255,255,0.25);
        }

        .menu-link.active:hover {
          transform: translateX(3px);

          background:
            linear-gradient(
              135deg,
              #a087d0,
              #8062b5
            );
        }

        .menu-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .menu-link:focus-visible {
          outline: 3px solid rgba(115,86,165,0.4);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .menu-link {
            transition: none;
          }
        }
      </style>

      <a
        class="menu-link ${isActive ? "active" : ""}"
        href="${this.escapeAttribute(targetUrl)}"
        ${isActive ? 'aria-current="page"' : ""}
      >
        <span class="menu-text">${this.escapeHTML(menuName)}</span>
      </a>
    `;
  }

  escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  escapeAttribute(value) {
    return this.escapeHTML(value);
  }
}

if (!customElements.get("my-menu")) {
  customElements.define("my-menu", Menu);
}
