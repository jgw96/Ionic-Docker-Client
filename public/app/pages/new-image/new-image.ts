import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Docker } from '../../providers/docker/docker';

/*
  Generated class for the NewImagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/new-image/new-image.html',
  providers: [Docker]
})
export class NewImagePage {

  constructor(private nav: NavController, private docker: Docker) {

  }

  pullImage(imageName: string) {
    this.docker.pullImage(imageName).subscribe(
      data => {
        console.log(data);
        this.nav.pop();
      },
      err => {
        this.nav.pop();
      }
    );
  }

}
