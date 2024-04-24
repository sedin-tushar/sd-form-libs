import { CommonModule } from '@angular/common';
import {  Component, forwardRef, Injector, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormControlHelper } from '../helpers/form-control-helper';
import { distinctUntilChanged, startWith, Subject, takeUntil, tap } from 'rxjs';
import { Options } from '../interfaces/options.interface'
@Component({
  selector: 'sd-dropdown',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() options: Options<any>[] = [];
  @Input() label: string = 'Select';
  private _destroy$ = new Subject<void>();
  private _isDisabled = false;
  selectedOptions: any[] = [];
  control: FormControl | any;

  constructor(private injector: Injector) { }

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit() {
    this.control = FormControlHelper.setFormControl(this.injector);
  }

  writeValue(value: any): void {
    if(!this.control) {
      this.control = new FormControl(value);
    }
    if (Array.isArray(value)) {
      this.selectedOptions = value;
    } else {
      this.selectedOptions = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectOptions(options: any[]): void {
    this.selectedOptions = options;
    this.onChange(options);
    this.onTouched();
  }

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  get isRequired(): boolean {
    return this.control ? !!this.control.validator && !!this.control.validator({} as FormControl)?.required : false;
  }
}
