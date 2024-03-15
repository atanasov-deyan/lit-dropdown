import { LitElement, css, html } from 'lit'
import { provide } from '@lit/context'
import { customElement, property, query, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { type DropdownContext, dropdownContext } from './dropdown-context'

type Alignment = 'left' | 'top' | 'right' | 'bottom'

@customElement('dropdown-element')
export class DropdownElement extends LitElement {
  @provide({context: dropdownContext })
  dropdownContext: DropdownContext = {
    activeItem: null,
    setActiveItem: (activeItem: string) => {
      this.dropdownContext = {
        ...this.dropdownContext,
        activeItem,
      }
    },
  }

  @state()
  private _isOpen: boolean = false

  @property({ type: String })
  label: string = ''


  @property({ type: String })
  alignment: Alignment = 'bottom'

  private _toggleDropdown = (e: Event) => {
    e.stopPropagation()
    this._isOpen = !this._isOpen
  }

  @query('#dropdown')
  dropdownElement?: HTMLUListElement;

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('click', this._windowClickListener)
  }

  disconnectedCallback() {
    window.removeEventListener('click', this._windowClickListener)
    super.disconnectedCallback()
  }

  private _windowClickListener = (event: MouseEvent) => {
    if (this.dropdownElement && !this.dropdownElement.contains(event.target as Node)) {
      this._isOpen = false
    }
  }

  render() {
    return html`
      <button class="button" @click=${this._toggleDropdown}>
        ${this.label}
      </button>
      ${when(
        this._isOpen,
        () => html`
          <ul id="dropdown" class=${`dropdown ${this.alignment}`}>
            <slot></slot>
          </ul>
        `,
        )}
    `
  }

  static styles = css`
    :host {
      position: relative;
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
      list-style-type: none;
      border: 1px solid #333132;
      border-radius: 4px;
      max-height: 10em;
      overflow-y: scroll;
      padding: 2px;
      width: 100%;
      background-color: inherit;
    }

    .bottom {
      position: absolute;
      inset: 0px auto auto 0px;
      transform: translate(0px, 20px);
    }

    .top {
      position: absolute;
      inset: auto auto 0px 0px;
      transform: translate(0px, -20px);
    }

    .right {
      position: absolute;
      inset: -10px auto auto 0px;
      margin: 0px;
      transform: translate(120px);
    }

    .left {
      position: absolute;
      inset: -10px auto auto 0px;
      margin: 0px;
      transform: translate(-130px);
    }
  `
}


declare global {
  interface HTMLElementTagNameMap {
    'dropdown-element': DropdownElement
  }
}
