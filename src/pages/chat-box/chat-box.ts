/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Chat Box
 * File path - '../../../../src/pages/chat-box/chat-box'
 */

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content, Slides } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Chat } from '../../models/chat';
import { ChatProvider } from '../../providers/chat/chat';
import { GiphyProvider } from '../../providers/giphy/giphy';

@IonicPage()
@Component({
  selector: 'page-chat-box',
  templateUrl: 'chat-box.html',
})
export class ChatBoxPage {

  @ViewChild(Content) content: Content;
  @ViewChild('mySlider') slider: Slides;

  // Chat Form that handles sending of messages
  chatForm: FormGroup;

  // Array List of Chat History
  chats: Array<Chat> = [];

  // List of chat reply message
  chatReplyMessages: any = this.chatProvider.randomChatReplyMsg();

  // List of GIF
  gifs: any = [];

  // GIF Images Limit
  limit: number = 25;

  // Search GIF Image 
  searchText: string;

  // Show/Hide GIF Slider Contents
  showGif: Boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private chatProvider: ChatProvider,
    private giphyProvider: GiphyProvider,
    private formBuilder: FormBuilder) {

  }

  /** Do any initialization */
  ngOnInit() {
    this.setupChatForm();
    this.getChatHistory();
  }

  /**
   * --------------------------------------------------------------
   * Chat Form
   * --------------------------------------------------------------
   * @method    setupChatForm
   */
  setupChatForm() {
    // Setup form
    this.chatForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
  }

  /**
   * --------------------------------------------------------------
   * Get Chat History
   * --------------------------------------------------------------
   * @method    getChatHistory
   */
  getChatHistory() {
    this.chatProvider.getChatHistoryData().subscribe((data) => {
      this.chats = data;
      this.scrollToBottom();
    })
  }

  /**
   * --------------------------------------------------------------
   * Get Gifs
   * --------------------------------------------------------------
   * @method    getGifs
   */
  getGifs() {
    this.giphyProvider.getTrendingGifs(this.limit).subscribe(
      (data: any) => {
        this.gifs.push(...data.data);
        this.limit = this.limit + 5;
        this.scrollToBottom();
      }
    )
  }

  /**
   * --------------------------------------------------------------
   * Search Gifs
   * --------------------------------------------------------------
   * @method    getGifs
   */
  searchGifs() {
    this.giphyProvider.searchGif(this.searchText).subscribe(
      (data: any) => {
        this.gifs = data.data;
        this.scrollToBottom();
      }
    )
  }

  /**
   * --------------------------------------------------------------
   * Input Box Focus
   * --------------------------------------------------------------
   * @method    onMessageInputFocus
   */
  onMessageInputFocus() {
    setTimeout(() => this.scrollToBottom(), 100);
  }

  /**
   * --------------------------------------------------------------
   * Send Chat Message
   * --------------------------------------------------------------
   * @method    sendMsg
   */
  sendMsg() {
    let message = this.chatForm.controls['message'].value;

    if (message) {
      this.chats.push({
        senderName: "Tom Cruise",
        receiverName: "Alidia Parks",
        message: message,
        status: "sent",
        timestamp: new Date()
      });

      // Clear input field
      this.chatForm.controls['message'].setValue('');

      setTimeout(() => this.scrollToBottom(), 100);

      // Reply back message
      this.replyMessage();
    }
  }

  /**
   * --------------------------------------------------------------
   * Send Gif Image Message
   * --------------------------------------------------------------
   * @method    sendGif
   */
  sendGif() {

    // Selected Gif Image Index
    let theClickedIndex = this.slider.clickedIndex;

    // Selected Gif Image
    let msgGifImg = this.gifs[theClickedIndex].images.preview_gif.url;

    if (msgGifImg) {
      this.chats.push({
        senderName: "Tom Cruise",
        receiverName: "Alidia Parks",
        image: msgGifImg,
        status: "sent",
        timestamp: new Date()
      });
    }

    setTimeout(() => this.scrollToBottom(), 100);

    this.replyMessage();
  }

  /**
   * --------------------------------------------------------------
   * Reply Back Chat Message
   * --------------------------------------------------------------
   * @method    replyMessage
   */
  replyMessage() {

    let replyMes = this.chatReplyMessages[Math.floor(Math.random() * this.chatReplyMessages.length)];

    // Simulate response after delay
    setTimeout(() => {
      this.chats.push({
        senderName: "Alidia Parks",
        receiverName: "Tom Cruise",
        message: replyMes,
        status: "received",
        timestamp: new Date()
      })
      this.scrollToBottom();
    }, 1000);
  }


  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * --------------------------------------------------------------
   * Scroll To Bottom
   * --------------------------------------------------------------
   * @method    scrollToBottom
   */
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }
}
