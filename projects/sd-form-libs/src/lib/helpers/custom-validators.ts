import { FormControl, Validators } from '@angular/forms';
type CountryCode = '+91' | '+52' | '+63' | '+1';

export function passwordValidator(): Validators {
  return (control: FormControl) => {
    const value: string = control.value;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const valid = hasUppercase && hasLowercase && hasSpecial;
    return valid ? null : { invalidPassword: true };
  };
}

export function whitespaceValidator(): Validators {
  return (control: FormControl) => {
    const value: string = control.value;
    const hasWhitespace = /\s/.test(value);
    return hasWhitespace ? { whitespaceError: true } : null;
  };
}

export function mobileNumberValidator(control: FormControl<{ mobile: string; countrycode: CountryCode }>): Validators {
  const mobileVal = control.value && control.value['mobile'];
  const countryCodeVal = control.value && control.value['countrycode'];

  const countryCodeValidations: { [key in CountryCode]: (mobile: string) => boolean } = {
    '+91': (mobile) => /^[6-9]\d{9}$/.test(mobile),
    '+52': (mobile) => /^[2-9]\d{9}$/.test(mobile),
    '+63': (mobile) => /^\d{9}$/.test(mobile),
    '+1': (mobile) => /^\d{10}$/.test(mobile)
  };


  const isValidMobile = countryCodeValidations[countryCodeVal] && countryCodeValidations[countryCodeVal](mobileVal);
  if (isValidMobile) {
    return '';
  } else {
    return { invalidMobile: true };
  }
}



