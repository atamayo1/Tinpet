/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of settings
 * File path - '../../../../src/pages/settings/settings'
 */


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  women: Boolean = true;
  man: Boolean = false;
  distance: any = 23
  ages: any;
  visibility: Boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ngAfterViewInit(): void {
    this.ages = { lower: 37, upper: 68 };
  }

  // Logout
  logout() {
    this.navCtrl.setRoot('LandingPage');
  }
  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
