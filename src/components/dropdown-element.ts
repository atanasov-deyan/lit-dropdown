import { LitElement, css, html } from 'lit'
import { provide } from '@lit/context'
import { customElement, property, query, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

import { type DropdownContext, dropdownContext } from '../models/dropdown-context'
import variables from '../css'

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
      border-radius: ${variables.borderRadius};
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: ${variables.dodgerBlue};
      cursor: pointer;
      transition: background-color 0.25s;
    }

    .button:hover {
      background-color: ${variables.blueRibbon};
    }

    .dropdown {
      list-style-type: none;
      border: 1px solid ${variables.mineShaft};
      border-radius: ${variables.borderRadius};
      max-height: 128px;
      overflow-y: scroll;
      padding: ${variables.tinySpacing};
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
