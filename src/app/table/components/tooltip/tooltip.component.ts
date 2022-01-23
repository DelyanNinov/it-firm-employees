import { Component } from '@angular/core';
import { ITooltipParams } from 'ag-grid-community';
import { ITooltipAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'tooltip-component',
  template: `
    <div class="custom-tooltip" [style.background-color]="'white'">
      <div>
        <div>
          <h1 style="font-size: 12px;">Имейл:</h1>
          <p>{{ email }}</p>
        </div>

        <div><h1 style="font-size: 12px;">Телефон:</h1></div>
        <div>
          <p>{{ telephone }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        position: absolute;
        width: 150px;
        height: 70px;
        pointer-events: none;
        transition: opacity 1s;
      }

      :host.ag-tooltip-hiding {
        opacity: 0;
      }
      .custom-tooltip {
        padding: 5px;
        color: #3b4d57;
        box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
      }
      .custom-tooltip p {
        margin-left: 10px;
        margin-top: -5px;
      }
      .custom-tooltip h1 {
        margin-left: 10px;
      }
    `,
  ],
})
export class CustomTooltip implements ITooltipAngularComp {
  private params: { color: string } & ITooltipParams;
  email: string = '';
  telephone: string = '';
  agInit(params: { color: string } & ITooltipParams): void {
    this.params = params;
    this.email = params.data.email;
    this.telephone = params.data.telephone;
    // this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    // this.color = this.params.color || 'white';
  }
}
