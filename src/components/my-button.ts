import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import variables from '../css';
import { toClassName } from '../utils/toClassName';

export type ButtonSize = 'small' | 'middle' | 'large';
type ButtonHtmlType = 'submit' | 'button' | 'reset';
export type ButtonType = 'default' | 'primary' | 'ghost' | 'text' | 'danger' | 'success' | 'warning';

@customElement('my-button')
export class MyButton extends LitElement {
  @property({ type: String })
  size: ButtonSize = 'middle'

  @property({ type: String })
  type: ButtonType = 'default'

  @property({ type: String })
  htmlType: ButtonHtmlType = 'button'

  @property()
  onClick?: (e?: Event) => void

  private _getClass = () => {
    const typeClass = `button-${this.type}`
    const sizeClass = `button-${this.size}`

    return toClassName([
      'button',
      typeClass,
      sizeClass,
    ])
  }

  render() {
    return html`
    <button
      @click=${this.onClick}
      type=${this.htmlType}
      class=${this._getClass()}
    >
      <slot></slot>
    </button>`
  }

  static styles = css`
    .button {
      text-align: center;
      color: ${variables.white};
      border-radius: ${variables.borderRadius};
      border: none;
      cursor: pointer;
      font-weight: 500;
    }

    .button-small {
      font-size: ${variables.fontSizeSmall};
      height: 24px;
      padding: 0 ${variables.smallSpacing}
    }

    .button-middle {
      font-size: ${variables.fontSizeMedium};
      height: 32px;
      padding: 0 ${variables.mediumSpacing}
    }

    .button-large {
      font-size: ${variables.fontSizeLarge};
      height: 46px;
      padding: 0 ${variables.largeSpacing}
    }

    .button-default {
      background-color: ${variables.zumthorBlue};
      color: ${variables.black};
    }

    .button-primary {
      background-color: ${variables.dodgerBlue};
    }

    .button-ghost {
      background-color: ${variables.mischkaGrey};
      color: ${variables.black};
    }

    .button-text {
      background-color: transparent;
      color: ${variables.black};
    }

    .button-default:active {
      background-color: ${variables.hawkesBlue};
    }

    .button-primary:active {
      background-color: ${variables.blueRibbon};
    }

    .button-ghost:active {
      background-color: ${variables.ghost};
    }

    .button-default:hover {
      background-color: ${variables.hawkesBlue};
    }

    .button-primary:hover {
      background-color: ${variables.blueRibbon};
    }

    .button-ghost:hover {
      background-color: ${variables.ghost};
    }

    .button:disabled {
      cursor: not-allowed;
      background-color: ${variables.ghost};
      color: ${variables.silver};
    }

    .button-text:disabled {
      cursor: not-allowed;
      background-color: transparent;
      color: ${variables.silver};
    }

    .button-danger {
      background-color: ${variables.valencia}
    }

    .button-danger:active {
      background-color: ${variables.elSalva};
    }

    .button-danger:hover {
      background-color: ${variables.elSalva};
    }

    .button-success {
      background-color: ${variables.surfGreen}
    }

    .button-success:active {
      background-color: ${variables.laurelGreen};
    }

    .button-success:hover {
      background-color: ${variables.laurelGreen};
    }

    .button-warning {
      background-color: ${variables.sunglow};
      color: ${variables.black};
    }

    .button-warning:active {
      background-color: ${variables.amber};;
      color: ${variables.black};
    }

    .button-warning:hover {
      background-color: ${variables.amber};;
      color: ${variables.black};
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-button': MyButton
  }
}
