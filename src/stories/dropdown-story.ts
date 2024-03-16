import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import '../components/dropdown-element'
import '../components/dropdown-item'
import { ButtonSize, ButtonType } from '../components/my-button'
import { Alignment } from '../components/dropdown-element'

import variables from '../css'

const actions = [
  {
    label: 'size',
    options: ['small', 'middle', 'large'],
  },
  {
    label: 'type',
    options: ['default', 'primary', 'ghost', 'text', 'danger', 'success', 'warning'],
  },
  {
    label: 'alignment',
    options: ['left', 'top', 'right', 'bottom'],
  },
] as const

type Settings = {
  size: ButtonSize,
  type: ButtonType,
  alignment: Alignment
}

@customElement('dropdown-story')
export class DropdownStory extends LitElement {

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
  @state()
  _settings: Settings = {
    // todo: pass default active option
    size: 'middle',
    type: 'primary',
    alignment: 'bottom',
  }

  private _setSettings = (settings: Settings) => this._settings = settings

  private _onChange = (e: Event) => {
    e.stopPropagation()
    const target = e.target as HTMLSelectElement
    const { selectedOptions, name } = target
    const [selectedOption] = selectedOptions

    this._setSettings({
      ...this._settings,
      [name]: selectedOption.value,
    })
  }

  render() {
    return html`
      <div>
        <nav class="nav">
          ${actions.map(action =>
            html`
              <div class="select-container">
                <label for=${`${action.label}-select`}>Select dropdown ${action.label}</label>
                <select
                  id=${`${action.label}-select`}
                  name=${action.label}
                  @change=${this._onChange}
                >
                  ${action.options.map(option =>
                    html`
                      <option
                        value=${option}
                        ?selected=${option === this._settings[action.label]}

                      >
                        ${option}
                      </option>
                    `,
                    )}
                </select>
              </div>
            `,
            )}
        </nav>
        <dropdown-element
          label="Dropdown"
          size=${this._settings.size}
          type=${this._settings.type}
          alignment=${this._settings.alignment}
        >
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
      </div>
    `
  }

  static styles = css`
    .nav {
      margin-bottom: 250px;
      display: flex;
    }

    .select-container {
      display: flex;
      flex-direction: column;
      margin: 0 ${variables.baseSpacing}
    }

    .option {
      margin-right: ${variables.smallSpacing}
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'dropdown-story': DropdownStory
  }
}
