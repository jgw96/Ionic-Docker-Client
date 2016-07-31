import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ImageInfoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/image-info/image-info.html',
})
export class ImageInfoPage {

  data: any;
  tag: string;
  os: string;
  arch: string;
  id: string;
  created: Date;

  constructor(private nav: NavController, private params: NavParams) {
    
  }

  ionViewDidEnter() {
    this.data = this.params.get('data');
    console.log(this.data);

    this.tag = this.data.RepoTags[0];
    this.os = this.data.Os;
    this.arch = this.data.Architecture;
    this.created = new Date(this.data.Created);
    this.id = this.data.Id;
  }

}
