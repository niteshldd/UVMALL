import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../user-model';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { SignupPage } from '../signup/signup';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User = {
    username: "singh",
    password: "Active1"
  }

  url: string;
  headers: Headers;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alterCtrl : AlertController, public http: Http) {
    this.headers = new Headers();
    this.headers.append("X-Parse-Application-Id","AppId1");
    this.headers.append("X-Parse-REST-API-Key","restAPIKey");
    this.headers.append("X-Parse-Revocable-Session","1");

  }

  goToSignUp(){
    this.navCtrl.push(SignupPage);
  }

  login(){
    if(!(this.user.username && this.user.password)){
      this.alterCtrl.create({
        title: "Error",
        message: "Check username or password . Please retry",
        buttons: ['OK']
      }).present();
      return;
    }
    this.url = "http://ec2-34-219-71-164.us-west-2.compute.amazonaws.com:9000/app1/login?username="+this.user.username+
    "&password="+this.user.password;
    this.http.get(this.url, {headers: this.headers}).subscribe(res=>{
      console.log(res);
      //Navigate the user to main app page
      this.navCtrl.setRoot(HomePage)
    }, err => {
      console.log(err);
    })
  }

}
