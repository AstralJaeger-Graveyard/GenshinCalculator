import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  public enabled: boolean = true;

  constructor() { }

  public log(message?: string, ...data: any[]){
    if(this.enabled) {
      console.log(message, data);
    }
  }
}
