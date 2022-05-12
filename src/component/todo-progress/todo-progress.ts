// import { css, CSSResultGroup, html, unsafeCSS } from 'lit';
// import { MobxLitElement } from '@adobe/lit-mobx';
// import { customElement, property } from 'lit/decorators.js';
// // import { styleMap } from 'lit/directives/style-map.js';

// customElement('todo-progress');
// export class TodoProgress extends MobxLitElement {
//   //   @property({ type: Number }) width = 100;
//   //   @property({ type: Number }) completeRatio = 0;

//   //   static styles: CSSResultGroup = css`
//   //     .progress {
//   //       height: 4px;
//   //       background: #787c85c3;
//   //       position: relative;
//   //     }
//   //     .progress::after {
//   //       height: 100%;

//   //       background-color: red;
//   //       position: absolute;
//   //       top: 0;
//   //       left: 0;
//   //     }
//   //   `;

//   protected render(): unknown {
//     return html` <div class="progress">hello hery</div> `;
//   }
// }

import { html, CSSResultGroup, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { styleMap } from 'lit/directives/style-map.js';
@customElement('todo-progress')
export class TodoProgress extends MobxLitElement {
  @property({ type: Number }) width = 100;
  @property({ type: Number }) completeRatio = 0.1;

  static styles: CSSResultGroup = css`
    .progress {
      height: 8px;
      border-radius: 8px;
      overflow: hidden;
      background: #787c85c3;
      position: relative;
      margin: 1rem 0;
      display: inline-block;
    }
    .progress-after {
      height: 100%;
      background-color: red;
      position: absolute;
      top: 0;
      left: 0;
      transition: all 0.5s;
    }
  `;

  protected render(): unknown {
    return html`
      <div class="progress" style=${styleMap({ width: this.width + 'px' })}>
        <span
          class="progress-after"
          style=${styleMap({
            width: Math.floor(this.completeRatio * 100) + '%',
          })}
        >
        </span>
      </div>
    `;
  }
}
