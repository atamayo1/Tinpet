/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Landing Page
 * File path - '../../../../src/pages/landing/landing'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams) { }

  /**
   * --------------------------------------------------------------
   * Go To Sign Up Page
   * --------------------------------------------------------------
   * @method    goToSignUpPage
   */
  goToSignUpPage() {
    this.navCtrl.setRoot('SignUpPage');
  }

  /**
   * --------------------------------------------------------------
   * Go To Sign In Page
   * --------------------------------------------------------------
   * @method    goToSignInPage
   */
  goToSignInPage() {
    this.navCtrl.setRoot('SignInPage');
  }
}
