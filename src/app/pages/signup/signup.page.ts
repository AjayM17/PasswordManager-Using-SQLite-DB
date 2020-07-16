import { Component, OnInit } from '@angular/core';
// import { StorageService } from '../../service/storage.service';
import { DatabaseService } from '../../services/database/database.service'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class SignupPage implements OnInit {

  mobile_number = null
  password = null
  re_password = null

  constructor(
    private databaseService: DatabaseService,
    private navCtrl: NavController
  ) { 
   
  }

  ngOnInit() {
  }

  validateFields = () => {
    if (this.mobile_number == null || this.mobile_number.trim() == '') {
      return false
    }

    if (this.password == null || this.password.trim() == '') {
      return false
    }

    if (this.re_password == null || this.re_password.trim() == '') {
      return false
    }

    if (this.password.trim() != this.re_password.trim()) {
      return false
    }
    return true
  }

  registerUser = () => {
   if(this.validateFields()){
   const timestamp =  new Date().getTime()
   console.log(timestamp)
     const user_data = [timestamp, this.mobile_number,this.password]
     this.databaseService.createUser(user_data)
   }
  }

  goBackToLogin = () => {
    this.navCtrl.back()
  }

}
