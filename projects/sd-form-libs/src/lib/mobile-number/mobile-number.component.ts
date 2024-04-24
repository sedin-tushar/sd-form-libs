import { Component, forwardRef, HostListener, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlHelper } from '../helpers/form-control-helper';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MobileTransformPipe } from '../pipes/mobile-transform.pipe';

@Component({
  selector: 'app-mobile-number',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ValidationErrorsComponent,
    MatSelectModule,
    MatIconModule,
    MobileTransformPipe,
  ],
  templateUrl: './mobile-number.component.html',
  styleUrls: ['./mobile-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MobileNumberComponent),
      multi: true,
    },
  ],
})
export class MobileNumberComponent implements ControlValueAccessor, OnInit {
  control: FormControl | any;
  @Input() label: string = '';
  @Input() type: string = '';
  countryCodeOptions: {
    label: string;
    value: string;
    code: string;
  }[] = [
    {
      label: 'India +91',
      code: this.getFlagEmoji('IN'),
      value: '+91',
    },
    {
      label: 'Mexico +52',
      value: '+52',
      code: this.getFlagEmoji('MX'),
    },
    {
      label: 'Philippines +63',
      code: this.getFlagEmoji('PH'),
      value: '+63',
    },
    {
      label: 'USA +1',
      code: this.getFlagEmoji('US'),
      value: '+1',
    },
  ];
  selectedCountryCode: string = '+91';
  mobileNumber: string = '';
  input!: any;

  onChange: any = () => {};
  onTouched: any = () => {};

  @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
      const isNumericKey = event.key >= '0' && event.key <= '9';
      const isTextSelectionShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a';
      const isAllowedKey = allowedKeys.includes(event.key) || isNumericKey || isTextSelectionShortcut;

      if (!isAllowedKey) {
        event.preventDefault();
      }
    }

  constructor(
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.control = FormControlHelper.setFormControl(this.injector);
    this.mobileNumber = this.control.value['mobile'];
    this.selectedCountryCode = this.control.value['countrycode'];
  }

  writeValue(value: any): void {
    if (!this.control) {
      this.control = new FormControl(value);
    }
    if (value) {
      this.selectedCountryCode = value.countrycode || '+91';
      this.mobileNumber = value.mobile || '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  getIcon(countryCode: string): any {
    const selectedOption = this.countryCodeOptions.find(
      (option) => option.value === countryCode
    );
    return selectedOption ? selectedOption.code : null;
  }

  updateValue(): void {
    this.onChange({
      countrycode: this.selectedCountryCode,
      mobile: this.mobileNumber,
    });
  }
}