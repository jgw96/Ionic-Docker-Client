import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the RealDate pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'realdate'
})
@Injectable()
export class RealDate {
  transform(value: string, args: any[]) {
    return new Date(parseInt(value) * 1000);
  }
}
