/* eslint-disable import/no-extraneous-dependencies */
import globalThis from 'global';
import { html, LitElement } from 'lit';

const { CustomEvent, customElements } = globalThis;

/**
 * @attr {string} children - Children of the button
 * @attr {string} size - Size of the button, can be "small", "medium" or "large"; default is "medium".
 * @attr {string} backgroundColor - Color of the button's background
 *
 * @cssprop [--sb-primary-color=#1ea7fd] - Controls the color of bar
 *
 * @prop {boolean} primary - Set button in primary mode
 *
 * @event {CustomEvent} sb-button:click - Custom event send when the button is clicked
 *
 * @summary This is a simple Storybook Button
 *
 * @tag sb-button
 */
export class SbButton extends LitElement {
  // Currently TS decorators are not reflected so we have to use static `properties` function
  // https://github.com/Polymer/lit-html/issues/1476
  static get properties() {
    return {
      children: { type: String, reflect: true },
      primary: { type: Boolean },
      size: { type: String },
      backgroundColor: { type: String, attribute: 'background-color' },
    };
  }

  constructor() {
    super();
    this.primary = undefined;
    this.backgroundColor = undefined;
    this.size = 'medium';
    this.children = '';
  }

  onClick() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('sb-button:click', options));
  }

  render() {
    const mode = this.primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return html`
      <button
        type="button"
        class=${['storybook-button', `storybook-button--${this.size ?? 'medium'}`, mode].join(' ')}
        @click="${this.onClick}"
      >
        ${this.children}
      </button>
    `;
  }

  // render into the light dom so we can test this
  createRenderRoot() {
    return this;
  }
}

export const ButtonTag = 'sb-button';
customElements.define(ButtonTag, SbButton);
