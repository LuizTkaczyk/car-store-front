import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhonePipe implements PipeTransform {

  transform(value: number | string | undefined): string {
    if (value === undefined || value === null) {
      return ''; // ou algum valor padrão, dependendo do seu caso
    }

    const phoneNumber = value.toString().replace(/\D/g, ''); // Remove caracteres não numéricos

    if (phoneNumber.length === 11) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
    } else if (phoneNumber.length === 10) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
    } else {
      return value.toString();
    }
  }

}
