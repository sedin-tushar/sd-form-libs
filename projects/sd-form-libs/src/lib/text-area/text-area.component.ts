// text-area.component.ts
import { Component, forwardRef, HostListener, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormControlHelper } from '../helpers/form-control-helper';
import { CommonModule } from '@angular/common';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';

@Component({
  selector: 'sd-text-area',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,ValidationErrorsComponent],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent implements ControlValueAccessor, OnInit {
  control: FormControl | any;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  input!: string;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.control = FormControlHelper.setFormControl(this.injector);
  }

  writeValue(input: any){
    this.input = input;
  }

  registerOnChange(fn: any){
    this.onChange = fn;
  }

  registerOnTouched(fn: any){
    this.onTouched = fn;
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
