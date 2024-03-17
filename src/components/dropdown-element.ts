import { LitElement, css, html } from 'lit'
import { provide } from '@lit/context'
import { customElement, property, query, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

import './my-button'
import { ButtonSize, type ButtonType } from './my-button'
import { type DropdownContext, dropdownContext } from '../models/dropdown-context'
import variables from '../css'

export type Alignment = 'left' | 'top' | 'right' | 'bottom'

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

  @property({ type: String })
  type: ButtonType = 'primary'

  @property({ type: String })
  size: ButtonSize = 'middle'

  private _toggleDropdown = (e: Event) => {
    e.stopPropagation()
    this._isOpen = !this._isOpen
  }

  @query('#dropdown')
  _dropdownElement?: HTMLUListElement

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('click', this._windowClickListener)
  }

  disconnectedCallback() {
    window.removeEventListener('click', this._windowClickListener)
    super.disconnectedCallback()
  }

  private _windowClickListener = (event: MouseEvent) => {
    if (this._dropdownElement && !this._dropdownElement.contains(event.target as Node)) {
      this._isOpen = false
    }
  }

  render() {
    return html`
      <my-button
        .onClick=${this._toggleDropdown}
        type=${this.type}
        size=${this.size}
        >
        ${this.label}
      </my-button>
      ${when(
        this._isOpen,
        () => html`
          <ul id="dropdown" class=${`dropdown ${this.alignment}-${this.size} animate`}>
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

    .dropdown {
      list-style-type: none;
      border: 1px solid ${variables.thunder};
      border-radius: ${variables.borderRadius};
      max-height: 128px;
      overflow-y: scroll;
      padding: ${variables.tinySpacing};
      width: 100%;
      min-width: 100px;
      background-color: ${variables.mineShaft};
    }

    .bottom-middle {
      position: absolute;
      inset: 0px auto auto 0px;
      transform: translate(0px, ${variables.mediumSpacing});
    }

    .top-middle {
      position: absolute;
      inset: auto auto 0px 0px;
      transform: translate(0px, -${variables.mediumSpacing});
    }

    .right-middle {
      position: absolute;
      inset: -8px auto auto 100%;
      margin: 0px;
    }

    .left-middle {
      position: absolute;
      inset: -8px auto auto 0px;
      margin: 0px;
      transform: translate(-102%);
    }
    .bottom-small {
      position: absolute;
      inset: 0px auto auto 0px;
      transform: translate(0px, 12px);
    }

    .top-small {
      position: absolute;
      inset: auto auto 0px 0px;
      transform: translate(0px, -8px);
    }

    .right-small {
      position: absolute;
      inset: -2px auto auto 100%;
      margin: 0px;
    }

    .left-small {
      position: absolute;
      inset: -2px auto auto 0px;
      margin: 0px;
      transform: translate(-102%);
    }
    .bottom-large {
      position: absolute;
      inset: 0px auto auto 0px;
      transform: translate(0px, 20px);
    }

    .top-large {
      position: absolute;
      inset: auto auto 0px 0px;
      transform: translate(0px, -20px);
    }

    .right-large {
      position: absolute;
      inset: -14px auto auto 100%;
      margin: 0px;
    }

    .left-large {
      position: absolute;
      inset: -14px auto auto 0px;
      margin: 0px;
      transform: translate(-102%);
    }

    .animate {
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-name: animate-fade;
      animation-timing-function: cubic-bezier(.26, .53, .74, 1.48);
      animation-fill-mode: backwards;
    }

    .animate.fade {
      animation-name: animate-fade;
      animation-timing-function: ease;
    }

    @keyframes animate-fade {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @media screen and (prefers-reduced-motion: reduce) {
      .animate { animation: none !important; }
    }
  `
}


declare global {
  interface HTMLElementTagNameMap {
    'dropdown-element': DropdownElement
  }
}
