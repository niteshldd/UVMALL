import { Component } from '@angular/core';
import { NavController , AlertController} from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url: string;
  headers: Headers;
  friends: any[];
  userId: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, public localStorage: Storage) {
    this.headers = new Headers();
    this.headers.append("X-Parse-Application-Id","AppId1");
    this.headers.append("X-Parse-REST-API-Key","restAPIKey");
    this.headers.append("X-Parse-Revocable-Session","1");

    this.localStorage.get('user').then((value) => {
      this.userId = value;
      this.getFriends(null)
    })
    


  }

  showAddDialog(){
    this.alertCtrl.create({
      title: "Add Friend",
      message: "Enter Your  Post ",
      inputs : [{
        name: 'name',
        placeholder: 'Enter the name'
      },{
        name: 'email',
        placeholder: 'Enter the email'
      },{
        name: 'number',
        placeholder: 'Enter the number'
      }],
      buttons: [
        {
          text: "Cancel"
        },{
          text: "Save",
          handler: data => {
            //post the information to parse server
            this.url ="http://ec2-34-219-71-164.us-west-2.compute.amazonaws.com:9000/app1/classes/friendslist"
            this.http.post(this.url, {owner: this.userId, name: data.name, email: data.email, number: data.number, image: "https://www.uruvelaa.com/uruvela_dev/Creative%20Tim%20-%20Fully%20coded%20UI%20Tools%20to%20create%20web%20apps_files/paperkit.jpg"},{headers: this.headers}).map(res => res.json()).subscribe(res => {
              console.log(res);
              this.alertCtrl.create({
                title: "Success",
                message: "Friend Information Saved Successfully",
                buttons : [{
                  text: "OK",
                  handler: ()=>{
                    this.getFriends(null);
                  }
                }]
              }).present();
            },err =>{
              console.log(err);
              this.alertCtrl.create(
                {
                  title : "Error",
                  message : err.text(),
                  buttons: [{
                    text: "OK"
                  }]
                }
              ).present();
            })
            
          }
        }
      ]   
    }).present();

  }
  getFriends(refresher){
    this.url = 'http://ec2-34-219-71-164.us-west-2.compute.amazonaws.com:9000/app1/classes/friendslist?where={"owner": "'+ this.userId+ '" }';
    this.http.get(this.url, {headers: this.headers}).map(res => res.json() ).subscribe(res => {
      console.log(res);
      //need to restrict access to data in server also and confirm here 
      this.friends = res.results;
      if(refresher !== null)
      refresher.complete();

    },err => {
      this.alertCtrl
      .create({title : "Error", message: err.text(), buttons: [{
        text : 'OK',
      }]}).present();
    })
  }
}
