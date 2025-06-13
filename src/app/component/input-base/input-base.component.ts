import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-base',
  templateUrl: './input-base.component.html',
  styleUrl: './input-base.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputBaseComponent),
      multi: true,
    },
  ],
})
export class InputBaseComponent implements ControlValueAccessor {
  value: string = '';

  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() lbTitle = '';


  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  onInput(event: any): void {
    const newValue = event.target.value;
    this.value = newValue;
    this.onChange(newValue);
    this.onTouched();
  }
}
