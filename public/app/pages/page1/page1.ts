import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, PopoverController } from 'ionic-angular';

import { Docker } from '../../providers/docker/docker';
import { InfoPage } from '../info/info';
import { NewContainerPage } from '../new-container/new-container';
import { ContainerOptionsPage } from '../container-options/container-options';

@Component({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [Docker]
})
export class Page1 {

  containers: any[];

  constructor(
  private navCtrl: NavController, 
  private docker: Docker,
  private alertCtrl: AlertController,
  private modalCtrl: ModalController,
  private popoverCtrl: PopoverController) {
  }

  ionViewDidEnter() {
    this.getContainers();
  }

  getContainer(id: string) {
    this.docker.getContainer(id).subscribe(
      data => {
        this.navCtrl.push(InfoPage, { data });
      },
      err => console.error(err)
    );
  }

  start(id: string) {
    this.docker.startContainer(id).subscribe(
      data => {
        this.getContainers();
      },
      err => {
        this.getContainers();
      }
    );
  }

  stop(id: string) {
    this.docker.stopContainer(id).subscribe(
      data => {
        console.log(data);
        this.getContainers();
      },
      err => {
        this.getContainers();
      }
    );
  }

  removeContainer(id: string) {
    let alert = this.alertCtrl.create({
      title: 'Delete this container?',
      message: 'Are you sure you would like to delete this container?',
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
            this.docker.removeContainer(id).subscribe(
              data => {
                console.log(data);
                this.getContainers();
              },
              err => {
                console.error(err);
                this.getContainers();
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

  addContainer() {
    this.navCtrl.push(NewContainerPage);
  }

  private getContainers() {
    this.docker.getAllContainers().subscribe(
      data => {
        console.log(data);
        this.containers = data;
      },
      err => console.error(err)
    );
  }

  presentPopover(ev: Event) {
    let popover = this.popoverCtrl.create(ContainerOptionsPage);
    popover.present({
      ev: ev
    });
  }
}
