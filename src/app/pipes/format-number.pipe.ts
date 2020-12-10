import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number): string {
    if(value > 1000000){
      value = value / 1000;
      return `${value}M`;
    }
    if (value > 1000) {
      value = value / 1000;
      return `${value}k`;
    }
    else
      return value + "";
  }

}
