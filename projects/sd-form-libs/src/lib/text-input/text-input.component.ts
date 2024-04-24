import { Component,HostListener,Injector,Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlHelper } from '../helpers/form-control-helper';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'sd-text-input',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,ValidationErrorsComponent],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers:  [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true
    },
  ]
})
export class TextInputComponent implements ControlValueAccessor,OnInit{
  control: FormControl | any;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() allowOnlyText: boolean = false;

  @Input() isPrefix: boolean = false;
  input!: string;

  onChange: any = () => { };
  onTouched: any = () => { };

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.allowOnlyText && this.type === 'text') {
      const allowedCharacters = /^[a-zA-Z]+$/;
      if (!allowedCharacters.test(event.key)) {
        event.preventDefault();
      }
    }
  }

  constructor(private injector: Injector, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.control = FormControlHelper.setFormControl(this.injector);
      this.control?.valueChanges.subscribe(() =>{
        if(this.type === 'number'){
          this.control.setValue(Math.abs(this.control.value),{emitEvent: false,});
        }
        else if (this.type === 'text') {
          const currentValue = this.control?.value?.toString();
          const updatedValue = currentValue?.replace(/[^a-zA-Z]/g, '');
          if(currentValue !== updatedValue){
            this.control.setValue('', { emitEvent: false });
          }
        }
      });
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