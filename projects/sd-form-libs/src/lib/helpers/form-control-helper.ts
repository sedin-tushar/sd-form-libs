import { Injector } from '@angular/core';
import { FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl } from '@angular/forms';

export class FormControlHelper {
  static setFormControl(injector: Injector): FormControl {
    try {
      const formControl = injector.get(NgControl);

      switch (formControl.constructor) {
        case FormControlName:
          return injector.get(FormGroupDirective).getControl(formControl as FormControlName);
        default:
          return (formControl as FormControlDirective).form as FormControl;
      }
    } catch (err) {
      return new FormControl();
    }
  }
}
