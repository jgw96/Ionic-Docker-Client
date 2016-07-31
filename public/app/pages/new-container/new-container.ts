import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Docker } from '../../providers/docker/docker';

/*
  Generated class for the NewContainerPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/new-container/new-container.html',
  providers: [Docker]
})
export class NewContainerPage {

  images: any[];
  selectedImage: string;

  constructor(
  private navCtrl: NavController, 
  private docker: Docker) {

  }

  ionViewDidEnter() {
    this.docker.getAllImages().subscribe(
      data => {
        this.images = data;
      },
      err => console.error(err)
    );
  }

  imageSelected(image: any) {
    console.log(image);
    this.selectedImage = image;
  }

  createContainer(command: string, name: string) {
    this.docker.createContainer(this.selectedImage, command, name).subscribe(
      data => {
        console.log(data);
        this.navCtrl.pop();
      },
      err => console.error(err)
    );
  }

}
