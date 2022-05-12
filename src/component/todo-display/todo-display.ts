import { css, CSSResultGroup, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { store } from '../../store';
import { MobxLitElement } from '@adobe/lit-mobx';

@customElement('todo-display')
export class TodoDisplay extends MobxLitElement {
  static styles: CSSResultGroup = css`
    .input-display {
      width: 25rem;
      border-radius: 1rem;
      overflow: hidden;
      margin-top: 2rem;
      font-size: 1.8rem;
      text-transform: capitalize;
    }
    .odd-todo {
      background-color: #edf3f6;
    }
    .even-todo {
      background-color: #d6e4ec;
    }
    .todo {
      padding: 0.5rem 1rem;
      color: #333;
      font-family: Arial, Helvetica, sans-serif;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
    .todo-detail {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    button {
      border: none;
      outline: none;
      border-radius: 8px;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      font-weight: 200;
    }
    .edit {
      background-color: #1190de;
      color: #eee;
    }
    .delete {
      background-color: #ffa0a0;
    }
  `;
  protected render(): unknown {
    return html`<div class="input-display">
      ${store.todos.map(
        ({ task, done, id }, i) => html`
          <div
            class=${classMap({
              'even-todo': i % 2 === 0,
              'odd-todo': i % 2 === 1,
              todo: true,
            })}
          >
            <div class="todo-detail">
              <input
                id=${'task-' + id}
                type="checkbox"
                .checked=${done}
                @change=${() => store.handleCheck(id)}
              />
              <label for=${'task-' + id}> ${task} </label>
            </div>
            <div>
              <button @click=${() => store.editTodo(id)} class="edit">
                Edit
              </button>
              <button @click=${() => store.deleteTodo(id)} class="delete">
                Delete
              </button>
            </div>
          </div>
        `
      )}
    </div>`;
  }
}
