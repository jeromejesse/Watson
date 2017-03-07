import { Component } from '@angular/core';


@Component({
  template: `
    <ion-list class="popover-page">
      <ion-row>
        <ion-col width-33>
          <img class="icon-bulle bulle" src="assets/images/agent.jpg"/>
        </ion-col>
        <ion-col width-66>
          <ion-row width-100 class="agent-name">Lamby</ion-row>
          <ion-row width-100>Marc</ion-row>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col class="padding-left-25" width-50>
          <a href="tel:00352661272021">
            <ion-icon class="call-bulle" name="call"></ion-icon>
          </a>
        </ion-col>
        <ion-col class="padding-left-25" width-50 >
        <a href="mailto:marc.lamby@foyer.lu?Subject=Hello%20from%20Watson">
          <ion-icon class="call-bulle" name="mail"></ion-icon>
        </a>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col class="padding-left-25 margin-left-50" width-100 >
        <a href="facetime:00352661272021">
          <ion-icon class="call-bulle green" name="videocam"></ion-icon>
        </a>
        </ion-col>
      </ion-row>
    </ion-list>
  `
})
export class PopoverAgent {

  constructor() {

  }

  ngOnInit() {
  }

}

