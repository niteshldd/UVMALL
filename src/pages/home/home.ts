import { Component } from '@angular/core';
import { NavController , AlertController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

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
          }
        }
      ]   
    }).present();

  }

}
