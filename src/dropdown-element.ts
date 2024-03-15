import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

type Alignment = 'left' | 'top' | 'right' | 'bottom'
@customElement('dropdown-element')
export class DropdownElement extends LitElement {

  @property({ type: String })
  label = ''

  @property({ type: Boolean })
  isOpen = false

  @property({ attribute: true })
  alignment: Alignment = 'bottom'

  private toggleDropdown(e: MouseEvent) {
    e.stopPropagation()
    this.isOpen = !this.isOpen
  }

  @query('.dropdown')
  dropdownElement?: HTMLElement;

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('click', this.windowClickListener)
  }

  disconnectedCallback() {
    window.removeEventListener('click', this.windowClickListener)
    super.disconnectedCallback()
  }

  private windowClickListener = (event: MouseEvent) => {
    if (this.dropdownElement && !this.dropdownElement.contains(event.target as Node)) {
      this.isOpen = false
    }
  }

  render() {
    return html`
      <button class="button" @click=${this.toggleDropdown}>
        ${this.label}
      </button>
      ${when(
        this.isOpen,
        () => html`
          <ul class="dropdown">
            <slot></slot>
          </ul>
        `
        )}
    `
  }

  static styles = css`
    :host {
      position: relative;
      display: block;
    }

    .button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #2E73FA;
      cursor: pointer;
      transition: background-color 0.25s;
    }
    .button:hover {
      background-color: #005CF9;
    }
    .button:focus,
    .button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    .dropdown {
      padding: 4px;
      margin: 0;
      list-style-type: none;
      border: 1px solid #333132;
      border-radius: 4px;
      max-height: 10em;
      overflow-y: scroll;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #F9FAFB;
      }
    }
  `
}


declare global {
  interface HTMLElementTagNameMap {
    'dropdown-element': DropdownElement
  }
}
