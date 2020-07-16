import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstletter'
})
export class FirstLetter implements PipeTransform {

  transform(value: string): any {
    return value.charAt(0).toUpperCase()
  }

}
