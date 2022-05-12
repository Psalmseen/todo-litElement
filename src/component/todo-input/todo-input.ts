import { css, CSSResultGroup, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { store } from '../../store';
import { MobxLitElement } from '@adobe/lit-mobx';

@customElement('todo-input')
export class TodoInput extends MobxLitElement {
  @query('#input') input!: HTMLInputElement;

  static styles?: CSSResultGroup = css`
    * {
      box-sizing: border-box;
    }
    .input {
      display: flex;
      gap: 0.5rem;
    }
    input {
      padding: 0.5rem 1rem;
      outline: none;
      font-size: 1.4rem;
      font-weight: 300;
      border-radius: 0.5rem;
      border: 1px solid #555;
    }
    button {
      border: none;
      background-color: #1190de;
      border-radius: 8px;
      color: #eee;
      padding: 0 1rem;
      cursor: pointer;
    }
    button:hover {
      background-color: #5dabdc;
    }
  `;
  protected render(): unknown {
    return html`<div class="input">
      <input
        id="input"
        .value=${store.currentTodo}
        @change=${store.handleInput}
        type="text"
      />
      <button
        @click=${() => {
          if (!this.input.value) {
            return;
          }
          store.addTodo(this.input.value);
          this.input.value = '';
        }}
      >
        Add Todo
      </button>
    </div>`;
  }
}
