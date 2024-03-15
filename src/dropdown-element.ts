import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

@customElement('dropdown-element')
export class DropdownElement extends LitElement {

  @property({ type: String })
  label = ''

  @property({ type: Boolean })
  isOpen = false

  @property({ type: Array })
  items: string[] = ['1', '2', '3']

  @property({ type: String })
  activeItem = ''

  private toggleDropdown(e: MouseEvent) {
    e.stopPropagation()
    this.isOpen = !this.isOpen
  }

  private setActive(item: string) {
    this.activeItem = item
  }

  render() {
    return html`
      <button @click=${this.toggleDropdown}>
        ${this.label}
      </button>
      ${when(
        this.isOpen,
        () => html`
          <ul>
            ${this.items.map(item => (
              html`
                <li
                  class=${this.activeItem === item ? 'active' : ''}
                  @click=${() => this.setActive(item)}
                >
                  ${item}
                </li>
              `
            ))}
          </ul>
        `
        )}
    `
  }

  static styles = css`
    button {
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
    button:hover {
      background-color: #005CF9;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    ul {
      padding: 4px;
      margin: 0;
      list-style-type: none;
      border: 1px solid #333132;
      border-radius: 4px;
    }

    li {
      text-align: start;
      padding: 4px;
    }

    .active {
      background-color: #333132;
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
