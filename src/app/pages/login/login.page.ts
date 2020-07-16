import { Component, OnInit } from '@angular/core';
// import { StorageService } from '../../service/storage.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../../services/database/database.service';
import{ WidgitsService } from '../../services/widgits/widgits.service'
import { UserDetailsService } from '../../services/user_details/user-details.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mobile_number = ''
  password = ''

  constructor(
    // private storageService: StorageService,
    private databaseService: DatabaseService,
    private router: Router,
    private navCtrl: NavController,
    private widgitsService: WidgitsService,
    private userDetailsService: UserDetailsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
     this.mobile_number = null
     this.password = null
  }

  validateFields = () => {
    if (this.mobile_number == null || this.mobile_number.trim() == '') {
       this.widgitsService.presentToast('Please Enter Mobile Number')
      return false
    }
    if (this.password == null || this.password.trim() == '') {
       this.widgitsService.presentToast('Please Enter Password')
      return false
    }
    return true
  }

  loginUser() {
    // this.router.navigate(['/dashboard'])
    if (this.validateFields()) {
      const data = [this.mobile_number, this.password]
       this.databaseService.getUsers(data).then((response) => {
         if(response['rows'].length == 1){
          this.userDetailsService.user_details = response['rows'].item(0)
          this.userDetailsService.generateSecureKeyAndIV()
          this.router.navigate(['/dashboard'])
         } else {
          this.widgitsService.presentToast('User doesn`t exists')
         }
      }).catch(err => {
        
        this.widgitsService.showLogInfo(err)
        this.widgitsService.presentToast('User doesn`t exists')
      })
    } 
  }

  goToSignUp = () => {
    this.navCtrl.navigateForward('signup')
  }
}
