
/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Swipe Page
 * File path - '../../../../src/pages/swipe/swipe'
 */


import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { User } from '../../models/user';
import { Direction, StackConfig, SwingStackComponent, SwingCardComponent } from 'angular2-swing';

@IonicPage()
@Component({
  selector: 'page-swipe',
  templateUrl: 'swipe.html',
})
export class SwipePage {

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  // Array list of users
  users: Array<User> = [];

  // Swing Card Configuration
  stackConfig: StackConfig;

  // Recent Swipe User
  swipeUser: any = '';

  constructor(private dataProvider: DataProvider,
    public modalCtrl: ModalController) { }

  ngOnInit() {
    this.cardConfig();
    this.getUserList();
  }

  /**
   * --------------------------------------------------------------
   * List of users
   * --------------------------------------------------------------
   * @method    getUserList
   */
  getUserList() {
    this.dataProvider.getUserList().subscribe(data => {
      this.users = data;
    })
  }

  /**
   * --------------------------------------------------------------
   * Set card stack configuration
   * --------------------------------------------------------------
   * @method    getUserList
   * 
   * See https://github.com/ksachdeva/angular2-swing
   * See https://github.com/gajus/swing
   */
  cardConfig() {
    this.stackConfig = {
      allowedDirections: [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT],
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.max(Math.abs(offsetX) / (element.offsetWidth / 2), Math.abs(offsetY) / (element.offsetHeight / 2)), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  /**
   * --------------------------------------------------------------
   * Called whenever we drag an element
   * --------------------------------------------------------------
   * @method    onItemMove
   */
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  /**
   * --------------------------------------------------------------
   *  Like/Dislike
   * --------------------------------------------------------------
   * @method    like    This method remove user from card stack and boolean status value
   * determine like/dislike decision.
   * @param     status  
   */
  like(status: boolean) {

    // Currently removed user from card
    let removedUser = this.users.pop();

    // If status is true, current user like this `removedUser` user otherwise dislike
    if (status) {
      this.swipeUser = removedUser;
      this.goToMatchPage(this.swipeUser);
    } else {
      this.swipeUser = removedUser;
    }
  }

  /**
   * --------------------------------------------------------------
   *  Go To Match Page
   * --------------------------------------------------------------
   * @method    goToMatchPage
   */
  goToMatchPage(user) {
    this.modalCtrl.create('MatchPage', { user: user }).present();
  }

  /**
   * --------------------------------------------------------------
   *  Open Profile Details Page
   * --------------------------------------------------------------
   * @method    goToProfileDetailsPage
   */
  goToUserDetailsPage(user) {
    this.modalCtrl.create('UserDetailsPage', { user: user }).present();
  }

  /**
   * --------------------------------------------------------------
   *  Refresh Card
   * --------------------------------------------------------------
   * @method    refresh
   */
  refresh() {
    this.getUserList();
  }
}

