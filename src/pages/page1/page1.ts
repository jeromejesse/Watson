import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  messages: Array<{title: string, message: string, float:string}>;
  message: string = '';

  constructor(public navCtrl: NavController) {
    this.messages = [];
    this.messages.push({
      title: 'Watson',
      message:'Bonjour je suis Watson, votre assistant personnel en assurance',
      float: 'left'
    })
  }

  outsideKeyboard(event) {
    Keyboard.close();
  }


  postMessage(event, message) {
    this.messages.push({
      title: 'Vous',
      message: message,
      float: 'right'
    });
    this.message = '';
  }

}
