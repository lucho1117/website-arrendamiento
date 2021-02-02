import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  customSortByNumber(array: any, parameters: any) {
    array.sort((a, b) => parseInt(b[parameters], 10) - parseInt(a[parameters], 10) );
    return array;
}

}
