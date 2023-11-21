import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (value === undefined || value === null) {
      return ''; // ou algum valor padrão, dependendo do seu caso
    }
    
    const formattedPrice = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return formattedPrice;
  }

}
