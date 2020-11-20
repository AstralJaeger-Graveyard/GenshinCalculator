import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  public enabled: boolean = true;

  constructor() { }

  public log(message?: string, ...optionalData: any[]){
    if(this.enabled) {
      console.log(message, optionalData);
    }
  }
}
