import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';

import { Docker } from '../../providers/docker/docker';
import { RealDate } from '../../pipes/RealDate';
import { ByteToMb } from '../../pipes/byteToMb';
import { ImageInfoPage } from '../image-info/image-info';
import { NewImagePage } from '../new-image/new-image';

@Component({
  templateUrl: 'build/pages/page2/page2.html',
  providers: [Docker],
  pipes: [RealDate, ByteToMb]
})
export class Page2 {

  images: any[];

  constructor(
    private navCtrl: NavController,
    private docker: Docker,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) {

  }

  ionViewDidEnter() {
    this.getImages();
  }

  getImage(id: string) {
    this.docker.getImage(id).subscribe(
      data => {
        this.navCtrl.push(ImageInfoPage, { data });
      },
      err => console.error(err)
    );
  }

  removeImage(id: string) {
    let alert = this.alertCtrl.create({
      title: 'Delete this image?',
      message: 'Are you sure you would like to delete this image?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.docker.removeImage(id).subscribe(
              data => {
                console.log(data);
                if (data.reason === 'conflict' && data.statusCode === 409) {
                  alert.dismiss().then(() => {
                    let errorAlert = this.alertCtrl.create({
                      title: 'Error deleting image',
                      message: data.json.message,
                      buttons: [
                        {
                          text: 'Ok'
                        }
                      ]
                    });
                    errorAlert.present();
                  });
                } else {
                  this.getImages();
                }
              },
              err => {
                console.error(err);
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  getImages() {
    this.docker.getAllImages().subscribe(
      data => {
        console.log(data);
        this.images = data;
      },
      err => console.error(err)
    );
  }

  addImageModal() {
    this.navCtrl.push(NewImagePage);
  }

}
