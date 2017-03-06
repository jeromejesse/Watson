import {Component, ChangeDetectorRef} from '@angular/core';

import {NavController, PopoverController} from 'ionic-angular';
import { Keyboard, SpeechRecognition } from 'ionic-native';
import { PopoverAgent } from "../popup/agent";
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [MessageService]
})
export class Page1 {
  messages: Array<any>;
  message: string = '';
  record: Boolean = false;
  haveResponse: String = "";
  dateTime = new Date();

  constructor(public navCtrl: NavController, private ref: ChangeDetectorRef, private popoverCtrl: PopoverController, private messageService: MessageService) {
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
    console.log(this.dateTime);
    this.messageService.postMessage(message).then((data) => {
      this.addMessageFromWatson(data.message);
      this.haveResponse = "";
      if(data.reponses){
        this.addReponse(data.reponses);
      }
    });
    this.messages.push({
      title: 'Vous',
      message: message,
      float: 'right'
    });
  }

  addMessageFromWatson(message){
    this.messages.push({
      title: 'Watson',
      message: message,
      float: 'left'
    })
  }

  addReponse(reponse){
    console.log(reponse);
    if ( reponse.length > 1 ) {
      this.messages.push({
        title: 'Vous',
        responses: reponse,
        float: 'right'
      });
      this.haveResponse = "multi";
    } else {
      if ( reponse.length > 0 ) {
        this.messages.push({
          title: 'Vous',
          responses: reponse,
          float: 'right'
        });
        this.haveResponse = "datetime";
      }
    }
  }

  popOverAgent(event){
    console.log("popOverAgent");
    let popover = this.popoverCtrl.create(PopoverAgent, {});
    popover.present({
      ev: event
    });
  }

  responseChoose(event, response){
    console.log("response", response);
    this.messageService.postMessage(response.code).then((data) => {
      this.addMessageFromWatson(data.message);
      this.haveResponse = "";
      if(data.reponses){
        this.addReponse(data.reponses);
      }
    });
    this.messages.push({
      title: 'Vous',
      message: response.label,
      float: 'right'
    });
  }

}
