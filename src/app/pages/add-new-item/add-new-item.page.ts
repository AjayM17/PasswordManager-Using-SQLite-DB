import { Component, OnInit } from '@angular/core';
// import { StorageService } from '../../service/storage.service';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../../services/database/database.service';
import { WidgitsService } from '../../services/widgits/widgits.service'
import { UserDetailsService } from '../../services/user_details/user-details.service'

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.page.html',
  styleUrls: ['./add-new-item.page.scss'],
})
export class AddNewItemPage implements OnInit {

  account_name = null
  account_id = null
  account_password = null
  passwordInputType = "password"

  constructor(
    // private storageService: StorageService,
    private databaseService: DatabaseService,
    private userDetailsService: UserDetailsService,
    private widgitsService: WidgitsService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  validateFields = () => {
    if (this.account_name == null || this.account_name.trim() == '') {
      this.widgitsService.presentToast('Please Enter Title')
      return false
    }
    return true
  }

  togglePasswordInputType() {
    if (this.passwordInputType == 'password') {
      this.passwordInputType = 'text'
    } else {
      this.passwordInputType = 'password'
    }
  }

  addNewField = (encrypt_pass) => {
    const timestamp = new Date().getTime()
    const data = [timestamp, this.userDetailsService.user_details['user_id'], this.account_name, this.account_id, encrypt_pass]
    this.databaseService.createPassword(data).then(response => {
      this.widgitsService.showLogInfo(response)
      this.widgitsService.presentToast('Item Added')
      this.navCtrl.back()
    }).catch(err => {
      this.widgitsService.showLogInfo(err)
    })
  }

  getEncryptedPassword = () => {
    if (this.validateFields()) {
      this.userDetailsService.getEncryptedPassword(this.account_password).then(res => {
        this.addNewField(res)
      }).catch(err => {
        this.widgitsService.presentToast('Failed to add')
      })
    }
  }
}
