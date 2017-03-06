import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {

  private messageUrl = 'http://192.168.201.56:8081/messages';  // URL to web api

  constructor(private http: Http) {
  }

  postMessage(message: String): Promise<any> {
    return this.http.post(this.messageUrl, {
      question : message
    })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
