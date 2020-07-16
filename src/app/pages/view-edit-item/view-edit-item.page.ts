import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database/database.service';
import{ WidgitsService } from '../../services/widgits/widgits.service'
import { UserDetailsService } from '../../services/user_details/user-details.service' 
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-edit-item',
  templateUrl: './view-edit-item.page.html',
  styleUrls: ['./view-edit-item.page.scss'],
})
export class ViewEditItemPage implements OnInit {

  account_name=null
  account_id = null
  account_password = null
  decrypted_password = null
  passwordInputType = "password"
  password_id = null
  user_id= null
  editable = false
  constructor(private activateRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private userDetailsService: UserDetailsService,
    private widgitsService: WidgitsService,
    private navCtrl: NavController
    ) {
    activateRoute.queryParams.subscribe(param => {
      widgitsService.showLogInfo(param['item'])
      widgitsService.showLogInfo (JSON.parse (param['item'])['account_name'])
      this.account_name = JSON.parse(param['item'])['account_name']
      widgitsService.showLogInfo(this.account_name)
      this.account_password = JSON.parse(param['item'])['account_password']
      this.account_id = JSON.parse(param['item'])['account_id']
      this.password_id = JSON.parse(param['item'])['password_id']
      this.user_id = JSON.parse(param['item'])['user_id']

      userDetailsService.getDecryptedPassword(this.account_password).then(res => {
        this.decrypted_password = res
      }).catch( err => {
      })
    })
   }

  ngOnInit() {
  }


  toggleEditabel = () => {
    this.editable = !this.editable
  }

  togglePasswordInputType() {
    if (this.passwordInputType == 'password') {
      this.passwordInputType = 'text'
    } else {
      this.passwordInputType = 'password'
    }
  }

  validateFields = () => {
    if(this.account_name ==  null || this.account_name.trim() == ''){
      this.widgitsService.presentToast('Please Enter Account Name')
      return false
    }
    return true
    // if (this.title == null || this.title.trim() == '') {
    //   // this.storageService.presentToast('Please Enter Title')
    //   return false
    // }
    // return true
  }

  updateItem = (password) => {
    const data = [this.account_name, this.account_id, password,this.password_id,this.user_id]
    this.databaseService.updatePassword(data).then( res => {
      this.widgitsService.showLogInfo(res)
      this.widgitsService.presentToast('Sucessfully Updated !')
      this.navCtrl.back()
      
    }).catch(err => {
      this.widgitsService.showLogInfo(err)
      this.widgitsService.presentToast('Failed to update')
    })
  }

  getEncryptedPassword = () => {
    if (this.validateFields()) {
      this.userDetailsService.getEncryptedPassword(this.decrypted_password).then(res => {
        this.updateItem(res)
      }).catch(err => {
        this.widgitsService.presentToast('Failed to add')
      })
    }
  }

  // updateItem() {
  //   if (this.validateFields()) {
  //     this.storageService.getItem('user' + this.storageService.user_id).then(data => {
  //       let items = []
  //       items = data
  //       const item_index = items.findIndex(item => item.id == this.id)
  //       if (item_index != -1) {
  //         items[item_index]['title'] = this.title
  //         items[item_index]['name'] = this.name
  //         items[item_index]['password'] = this.password
  //         this.storageService.setItem('user' + this.storageService.user_id, items)
  //         this.storageService.presentToast('Updated !!!')
  //       }
  //     }).then(err => {
  //     })
  //   }
  // }

}
