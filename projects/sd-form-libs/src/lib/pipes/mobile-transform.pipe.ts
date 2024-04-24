import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appMobileTransform',
  standalone: true,
})
export class MobileTransformPipe implements PipeTransform {
  transform(value: { countrycode: string; mobile: string }): unknown {
    return value?.mobile;
  }
}