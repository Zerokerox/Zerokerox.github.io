class ExpandableSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const contentTitle = this.getAttribute("content-title") || "Lesson";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'DM Sans', sans-serif;

          --bg: #0b1020;
          --surface: #151c30;
          --gold: #edc77a;
          --text: #f8f7f4;
          --muted: #a9b2c7;
          --border: rgba(255, 255, 255, 0.09);
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        details {
          margin: 12px 0;
          border: 1px solid var(--border);
          border-radius: 16px;
          background: var(--surface);
          overflow: hidden;
          color: var(--text);
          transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            background 0.3s ease;
        }

        details:hover {
          border-color: rgba(237, 199, 122, 0.4);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.16);
        }

        summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 22px;
          color: var(--text);
          cursor: pointer;
          list-style: none;
          user-select: none;
          transition:
            background 0.25s ease,
            color 0.25s ease;
        }

        summary::-webkit-details-marker {
          display: none;
        }

        summary::marker {
          content: "";
        }

        .summary-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
          min-width: 0;
        }

        .title {
          color: var(--gold);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.3px;
        }

        .subtitle {
  display: block;
  margin-top: 5px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 400;
}

        <!--.subtitle {
  display: block;
  margin-top: 7px;
  color: #f8f7f4;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.3px;
}-->

        

        .chevron {
          flex-shrink: 0;
          width: 9px;
          height: 9px;
          border-right: 2px solid var(--gold);
          border-bottom: 2px solid var(--gold);
          transform: rotate(45deg);
          transition: transform 0.3s ease;
          margin: 0 5px 5px 0;
        }

        details[open] {
          border-color: rgba(237, 199, 122, 0.35);
          background: linear-gradient(
            145deg,
            #151c30,
            #10172a
          );
        }

        details[open] summary {
          background: rgba(237, 199, 122, 0.06);
          border-bottom: 1px solid rgba(237, 199, 122, 0.16);
        }

        details[open] .chevron {
          transform: rotate(225deg);
          margin-bottom: -5px;
        }

        .detail-content {
          padding: 20px;
          color: var(--muted);
          line-height: 1.8;
        }

        ::slotted(ol),
        ::slotted(ul) {
          margin: 0;
          padding: 16px 20px 20px 42px;
          color: var(--muted);
          line-height: 1.8;
        }

        ::slotted(li) {
          padding: 5px 0;
        }

        ::slotted(li::marker) {
          color: var(--gold);
        }

        summary:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: -3px;
        }

        @media (max-width: 600px) {
          summary {
            padding: 16px;
          }

          .detail-content {
            padding: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            transition-duration: 0.01ms !important;
          }
        }
      </style>

      <details>
        <summary>
          <div class="summary-content">
            <div>
              <span class="title">${contentTitle}</span>
              <span class="subtitle">
                <slot name="sub-title"></slot>
              </span>
            </div>
            <span class="chevron"></span>
          </div>
        </summary>

        <div class="detail-content">
          <slot name="detail"></slot>
        </div>
      </details>
    `;
  }
}

if (!customElements.get("my-expandable-section")) {
  customElements.define("my-expandable-section", ExpandableSection);
}
