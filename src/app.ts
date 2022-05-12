import { css, CSSResultGroup, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { store } from './store';

import './component/todo-input/todo-input';
import './component/todo-display/todo-display';
import './component/todo-progress/todo-progress';

@customElement('todo-app')
export class TodoApp extends MobxLitElement {
  static styles?: CSSResultGroup = css`
    .progress-slot {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  `;
  render() {
    return html`
      <div>
        <div class="progress-slot">
          <span>${store.completedTodoNumber}/ ${store.todosNumber}</span>
          <todo-progress
            completeRatio=${store.completedTodoNumber / store.todosNumber}
          ></todo-progress>
        </div>
        <todo-input></todo-input>
        <todo-display></todo-display>
      </div>
    `;
  }
}
