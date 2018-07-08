import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../user-model';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user: User = {
    name: "",
    username: "",
    email: "",
    password: ""
  }

  confirmPassword: string;
  url: string;
  headers: Headers;

  constructor(public navCtrl: NavController, public navParams: NavParams , public alterCtrl : AlertController, public http: Http) {
    this.headers = new Headers();
    this.headers.append("X-Parse-Application-Id","AppId1");
    this.headers.append("X-Parse-REST-API-Key","restAPIKey");
    this.headers.append("X-Parse-Revocable-Session","1");
  
  }

  goToLogin(){
    this.navCtrl.pop()
  }

  Signup(){
    if(this.user.password != this.confirmPassword){
      this.alterCtrl.create({
        title: "Error",
        message: "Password do not match. Please retry.",
        buttons: ['OK']
      }).present();
      return;
    }
    this.url = "http://ec2-34-219-71-164.us-west-2.compute.amazonaws.com:9000/app1/users"

    this.http.post(this.url, this.user, {headers: this.headers })
    .map(res => res.json())
    .subscribe(res =>{
      console.log(res);
      this.alterCtrl
      .create ({title : "Success", message: "Congratulations. Accounts has been create. Please login,", buttons:[{
        text : "Login",
        handler: () => {
          this.navCtrl.pop();
        }
      }] })
      .present();
    },
  err => {
    console.log(err);
    this.alterCtrl.create({
      title: "Error",
      message: err.text(),
      buttons: [{text : 'OK' 
    }]
    }).present();
  })

  }

}
