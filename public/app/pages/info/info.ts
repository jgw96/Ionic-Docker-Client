import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the InfoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/info/info.html',
})
export class InfoPage {

  data: any;
  name: string;
  created: Date;
  id: string;
  restart: number;
  image: string;
  hostname: string;
  envs: any[];
  tty: boolean;
  command: any[];
  ip: string;
  bridge: string;
  mac: string;

  constructor(private nav: NavController, private params: NavParams) {

  }

  ionViewDidEnter() {
    this.data = this.params.get('data');
    console.log(this.data);

    this.name = this.data.Name;
    this.created = new Date(this.data.Created);
    this.id = this.data.Id;
    this.restart = this.data.RestartCount;
    this.image = this.data.Config.Image;
    this.hostname = this.data.Config.Hostname;
    this.envs = this.data.Config.Env;
    this.tty = this.data.Config.Tty;
    this.command = this.data.Config.Cmd;
    this.ip = this.data.NetworkSettings.IPAddress;
    this.bridge = this.data.NetworkSettings.Bridge;
    this.mac = this.data.NetworkSettings.MacAddress;
  }

}
