import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import './stories/dropdown-story'

@customElement('my-app')
export class MyApp extends LitElement {


  render() {
    return html`
      <dropdown-story></dropdown-story>
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
