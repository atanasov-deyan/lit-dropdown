import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './dropdown-element'

@customElement('app-element')
export class AppElement extends LitElement {

  @property({ type: String })
  label = ''

  @property({ type: Boolean })
  isOpen = false

  private items: string[] = [
    'Action 1',
    'Action 2',
    'Action 3',
    'Action 4',
    'Action 5',
    'Action 6',
    'Action 7',
    'Action 8',
  ]

  render() {
    return html`
      <dropdown-element label='Dropdown'>
      ${this.items.map(item => (
        html`
          <li>
            ${item}
          </li>
        `
      ))}
      </dropdown-element>
    `
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

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


    li:hover {
      background-color: #333132;

    }

    li:active {
      background-color: #e6efff;
      color: #000;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `
}


declare global {
  interface HTMLElementTagNameMap {
    'app-element': AppElement
  }
}