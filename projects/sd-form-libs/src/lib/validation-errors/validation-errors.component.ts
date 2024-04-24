import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'sd-validation-errors',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.scss'],

})
export class ValidationErrorsComponent {
  @Input() errors: Record<string, ValidationErrors> | null = {};
  @Input() invalid: boolean = false;
  @Input() touched: boolean = false;
  @Input() label: string = '';

  errorMessages: Record<string,string> = {
    required: `The field is required`,
    maxlength: 'You have entered more characters than expected',
    minlength: 'You have entered less characters than expected',
    invalidPassword: 'Password must contain atleast one uppercase,lowercase and a special character',
    whitespaceError: 'Invalid white space detected',
    invalidMobile: 'Enter a valid Mobile number',
    email: 'Enter a valid email address',
    pattern: 'The input does not match the required pattern',
    min: 'The value is less than the minimum allowed',
    max: 'The value is greater than the maximum allowed',
    requiredTrue: 'You must accept the terms and conditions',
    number: 'Enter a valid number',
    date: 'Enter a valid date',
    digits: 'Enter only digits',
    url: 'Enter a valid URL',
    compare: 'The values do not match',
    range: 'The value is not within the specified range',
    unique: 'Value must be unique',
    creditCard: 'Enter a valid credit card number',
    equalTo: 'The value must be equal to the specified value',
    passwordMismatch: 'Passwords do not match',
    alpha: 'Enter alphabetic characters only',
    alphaNumeric: 'Enter alphanumeric characters only',
    phone: 'Enter a valid phone number',
    zipCode: 'Enter a valid ZIP code',
    lowercase: 'Enter lowercase characters only',
    uppercase: 'Enter uppercase characters only',
    time: 'Enter a valid time',
    datetime: 'Enter a valid date and time',
    color: 'Enter a valid color',
    fileExtensions: 'Invalid file extension',
    fileSize: 'File size exceeds the limit',
  }
}
