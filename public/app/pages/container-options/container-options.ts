import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Docker } from '../../providers/docker/docker';

/*
  Generated class for the ContainerOptionsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  template: `
    <ion-list>
      <button (click)="stopAll()" ion-item>
        Stop all containers
      </button>
    </ion-list>
  `,
  providers: [Docker]
})
export class ContainerOptionsPage {

  constructor(private nav: NavController, private docker: Docker) {

  }

  stopAll() {
    this.docker.getAllContainers().subscribe(
      containers => {
        containers.forEach((container) => {
          this.docker.getContainer(container.Id).subscribe(
            container => {
              this.docker.stopContainer(container).subscribe(
                data => console.log(data),
                err => console.error(err)
              );
            },
            err => console.error(err)
          );
        });
      },
      err => console.error(err)
    );
  }

}
