import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformatting'
})
export class DateformattingPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    var dt: number = value
    var minutes = "00"
    var hours;
    dt = dt /100
    console.log(dt)
    if (dt < 12 && dt > 0){
      hours = dt + ":00 am"
    } else if (dt <= 0) {
      hours = 12 + ":00 am"
    } else if (dt > 12 && dt > 0) {
      hours = dt - 12 + ":00 pm"
    } else {
      hours = dt + ":00 pm"
    }

    return hours;
  }

}
