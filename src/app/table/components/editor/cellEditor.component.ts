import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { AgEditorComponent } from 'ag-grid-angular';

@Component({
  selector: 'editor-cell',
  templateUrl: './cellEditor.component.html',
})
export class CellEditor implements AgEditorComponent, AfterViewInit {
  @ViewChild('selectedValue') selectedValue: MatSelect;
  private params: any;
  value: string;
  defaultValue: string;
  scheduleList: string[] = ['office', 'home', 'sick', 'rest'];
  hours: number;
  public input: ViewContainerRef;

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.selectedValue.open();
    this.selectedValue.openedChange.subscribe((opened) => {
      if (opened) {
        this.selectedValue.panel.nativeElement.addEventListener(
          'mouseleave',
          () => {
            this.value = this.defaultValue;
            this.params.stopEditing();
          }
        );
      }
    });
    // focus on the input
    //setTimeout(() => this.input.element.nativeElement.focus());
  }

  agInit(params: any): void {
    console.log();

    this.params = params;
  }

  /* Component Editor Lifecycle methods */
  // the final value to send to the grid, on completion of editing
  getValue() {
    console.log('getValue');
    // this simple editor doubles any value entered into the input
    return this.value;
  }

  // Gets called once before editing starts, to give editor a chance to
  // cancel the editing before it even starts.
  isCancelBeforeStart() {
    this.defaultValue = this.params.value;
    return false;
  }

  // Gets called once when editing is finished (eg if Enter is pressed).
  // If you return true, then the result of the edit will be ignored.
  isCancelAfterEnd() {
    console.log('isCancelAfterEnd');
    // our editor will reject any value greater than 1000
    if (this.value === '') {
      return true;
    } else {
      return false;
    }
  }
  onChange(value: any) {
    if (this.hours) {
    }
    this.value = value;
    this.params.stopEditing();
  }
  onInputChange(value: number) {
    console.log(value);

    this.hours = value;
    this.value = value.toString();
  }
}
