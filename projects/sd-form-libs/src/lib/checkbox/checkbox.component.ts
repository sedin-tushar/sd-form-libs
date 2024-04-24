import { Component, Injector, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormControlHelper } from '../helpers/form-control-helper';
import { Options } from '../interfaces/options.interface'

@Component({
  selector: 'sd-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor,OnInit {
  @Input() options: Options<any>[] = [];
  @Input() label!: string;
  selectedValue: any;
  control: FormControl | any;
  private innerValue: any;

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(private injector: Injector) {
    this.innerValue = []
  }

  ngOnInit() {
    this.control = FormControlHelper.setFormControl(this.injector);
  }

  get checkedOptions(): any[] {
    if (!this.innerValue || !Array.isArray(this.innerValue)) {
        return [];
    }
    return this.options.filter(option => this.innerValue.includes(option.value));
  }

  set checkedOptions(options: any[]) {
    if (options) {
      this.innerValue = options.map(option => option.value);
      this.onChange(this.innerValue);
      this.onTouch(this.innerValue);
    }
  }

  writeValue(value: any): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  isChecked(option: any): boolean {
    if (!this.innerValue || !Array.isArray(this.innerValue)) {
        return false;
    }
    return this.innerValue.includes(option.value);
}

  toggleSelection(option: any): void {
    if (this.isChecked(option)) {
      this.checkedOptions = this.checkedOptions.filter(o => o.value !== option.value);
    } else {
      this.checkedOptions = [...this.checkedOptions, option];
    }
    const selectedValues = this.checkedOptions.map(o => o.value);
    this.control.setValue(selectedValues);
  }

  get dirty(): boolean {
    return this.control ? this.control.dirty : false;
  }

  get touched(): boolean {
    return this.control ? this.control.touched : false;
  }

  get disabled(): boolean {
    return this.control ? this.control.disabled : false;
  }

  get isRequired(): boolean {
    return this.control ? !!this.control.validator && !!this.control.validator({} as FormControl)?.required : false;
  }
}
