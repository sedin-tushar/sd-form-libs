import { Component,Injector,Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlHelper } from '../helpers/form-control-helper';
import { Options } from '../interfaces/options.interface'

@Component({
  selector: 'sd-radio',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers:  [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioGroupInputComponent,
      multi: true
    }
  ]
})
export class RadioGroupInputComponent implements ControlValueAccessor, OnInit {
  @Input() options: Options<any>[] = [];
  @Input() label = '';
  control: FormControl | any;
  selectedValue: any;
  private innerValue: any;

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.control = FormControlHelper.setFormControl(this.injector);
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