import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { consume } from '@lit/context'

import { type DropdownContext, dropdownContext } from './dropdown-context'
import { noop } from './utils/noop'

@customElement('dropdown-item')
export class DropdownItem extends LitElement {


  @property({ type: String })
  id = ''

  @consume({ context: dropdownContext, subscribe: true })

  @property({ attribute: false })
  dropdownContext?: DropdownContext

  render() {
    const { activeItem, setActiveItem } = this.dropdownContext ?? {
      activeItem: null,
      setActiveItem:noop,
    }

    return html`
      <li
        class=${`item ${activeItem === this.id ? 'active' : ''}`.trim()}
        @click=${() => setActiveItem(this.id)}
      >
        <slot></slot>
      </li>
    `
  }

  static styles = css`
    .item:hover {
      background-color: #333132;

    }

    .item:active {
      background-color: #e6efff;
      color: #000;
    }

    .active, .active:hover {
      background-color: #e6efff;
      color: #000;
    }
  `
}


declare global {
  interface HTMLElementTagNameMap {
    'dropdown-item': DropdownItem
  }
}
