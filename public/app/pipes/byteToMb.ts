import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the RealDate pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'bytetomb'
})
@Injectable()
export class ByteToMb {
  transform(value: number, args: any[]) {
    return Math.round(value / 1024 / 1024);
  }
}
