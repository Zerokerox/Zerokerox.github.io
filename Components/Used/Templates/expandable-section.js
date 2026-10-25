class ExpandableSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const contentTitle = this.getAttribute("content-title");
    this.shadowRoot.innerHTML = `
    <style>
      details {
        margin: 12px 0;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        background: #ffffff;
        overflow: hidden;
        transition:
          box-shadow 0.25s ease,
          border-color 0.25s ease;
      }

      details:hover {
        border-color: #93c5fd;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
      }

      details summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 16px 20px;
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
        cursor: pointer;
        list-style: none;
        user-select: none;
        transition:
          background 0.2s ease,
          color 0.2s ease;
      }

      /* ซ่อนไอคอนลูกศรเดิม */
      details summary::-webkit-details-marker {
        display: none;
      }

      details summary::marker {
        content: "";
      }

      /* เพิ่ม Chevron ด้านขวา */
      details summary::after {
        content: "";
        flex-shrink: 0;
        width: 8px;
        height: 8px;
        border-right: 2px solid #64748b;
        border-bottom: 2px solid #64748b;
        transform: rotate(45deg);
        transition: transform 0.25s ease;
        margin-right: 4px;
      }

      /* เมื่อเปิดรายละเอียด */
      details[open] {
        border-color: #93c5fd;
        box-shadow: 0 4px 16px rgba(37, 99, 235, 0.08);
      }

      details[open] summary {
        background: #eff6ff;
        color: #1d4ed8;
        border-bottom: 1px solid #dbeafe;
      }

      details[open] summary::after {
        transform: rotate(225deg);
        border-color: #2563eb;
      }

      /* ส่วนรายการ */
      details ul,
      details ol {
        margin: 0;
        padding: 16px 24px 16px 42px;
        color: #475569;
        line-height: 1.8;
      }

      details li {
        padding: 3px 0;
      }

      details li::marker {
        color: #3b82f6;
      }

      details summary:focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: -3px;
      }

 
    </style>
    <details>
      <summary>
      <div>
      ${contentTitle}
      <slot name="sub-title"></slot>
      <div>
      
      </summary>
      <slot name="detail"></slot>
    </details>
  
        `;
  }
}

customElements.define("my-expandable-section", ExpandableSection);
