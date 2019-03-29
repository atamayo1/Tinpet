/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Edit Profile
 * File path - '../../../../src/pages/edit-profile/edit-profile'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  public base64Image: string;
  img1: any = 'assets/imgs/13.jpg';
  img2: any;
  img3: any;
  img4: any;
  img5: any;
  img6: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private camera: Camera) {
  }

  /**
   * --------------------------------------------------------------
   * Open Gallery & Select Photo
   * --------------------------------------------------------------
   * @method    takePhoto
   * @param     num    Image Number
   */
  takePhoto(num) {
    // Camera Options
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500
    }
    this.camera.getPicture(options).then((base64String: string) => {
      this.base64Image = "data:image/*;base64," + base64String;

      if (num == 1) {
        this.img1 = this.base64Image;
      }
      if (num == 2) {
        this.img2 = this.base64Image;
      }
      if (num == 3) {
        this.img3 = this.base64Image;
      }
      if (num == 4) {
        this.img4 = this.base64Image;
      }
      if (num == 5) {
        this.img5 = this.base64Image;
      }
      if (num == 6) {
        this.img6 = this.base64Image;
      }
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
