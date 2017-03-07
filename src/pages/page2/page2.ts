import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Famille } from '../famille/famille';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  nav: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nav = navCtrl;
  }

  goToFamille(choice){
    console.log("choice", choice);
    this.nav.push(Famille)
  }
}
