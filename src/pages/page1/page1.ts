import {Component, ChangeDetectorRef} from '@angular/core';

import {NavController, PopoverController} from 'ionic-angular';
import { Keyboard, SpeechRecognition } from 'ionic-native';
import { PopoverAgent } from "../popup/agent";

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  messages: Array<{title: string, message: string, float:string}>;
  message: string = '';
  record: Boolean = false;

  constructor(public navCtrl: NavController, private ref: ChangeDetectorRef, private popoverCtrl: PopoverController) {
    this.messages = [];
    this.messages.push({
      title: 'Watson',
      message:'Bonjour je suis Watson, votre assistant personnel en assurance',
      float: 'left'
    })
    this.ref = ref;
  }

  outsideKeyboard(event) {
    Keyboard.close();
  }


  postMessage(event, message) {
    this.addMessage(message);
    this.message = '';
  }

  listenMessage(event) {
    Keyboard.close();
    let options = {
      language: "fr-FR",
      matches: 1,
      showPartial: false // iOS only
    };
    this.record = !this.record;
    if(this.record){
      SpeechRecognition.hasPermission()
        .then((hasPermission) => {
          if (hasPermission){
            this.startListening(options)
          } else {
            SpeechRecognition.requestPermission()
              .then(
                () => console.log('Granted'),
                () => console.log('Denied')
              )
          }
        });
    } else {
      SpeechRecognition.stopListening();
    }

  }

  startListening(options) {
    SpeechRecognition.startListening(options)
      .subscribe(
        (matches) => {
          console.log(matches);
          //this.message = matches[0];
          this.addMessage(matches[0]);
          this.ref.detectChanges();
        },
        (onerror) => console.log('error:', onerror)
      );
  }

  addMessage(message){
    this.messages.push({
      title: 'Vous',
      message: message,
      float: 'right'
    });
  }

  popOverAgent(event){
    console.log("popOverAgent");
    let popover = this.popoverCtrl.create(PopoverAgent, {});
    popover.present({
      ev: event
    });
  }

}
