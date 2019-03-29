/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Matches
 * File path - '../../../../src/pages/matches/matches'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

  users: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider,
    public modalCtrl: ModalController) { }

  /** Do any initialization */
  ngOnInit() {
    this.getUserList();
  }

  /**
   * --------------------------------------------------------------
   * List of users
   * --------------------------------------------------------------
   * @method    getUserList
   */
  getUserList() {
    this.dataProvider.getUserList().subscribe((data: any) => {
      this.users = data;
    });
  }

  /**
   * --------------------------------------------------------------
   * Open Chat Page
   * --------------------------------------------------------------
   * @method    openChatBox
   */
  openChatBox() {
    this.modalCtrl.create('ChatBoxPage').present();
  }
}
