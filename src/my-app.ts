import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import './components/dropdown-element'
import './components/dropdown-item'

@customElement('my-app')
export class MyApp extends LitElement {

  @state()
  private _items: string[] = [
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
      <dropdown-element label="Dropdown very long" alignment="right" size="large">
        ${this._items.map(item => (
          html`
            <dropdown-item
              id=${item}
            >
              ${item}
          </dropdown-item>
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
  `
}


declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp
  }
}
