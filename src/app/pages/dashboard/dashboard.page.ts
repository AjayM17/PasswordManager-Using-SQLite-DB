import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { DatabaseService } from '../../services/database/database.service';
import { WidgitsService } from '../../services/widgits/widgits.service'
import { UserDetailsService } from '../../services/user_details/user-details.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  search_key = ""
  passwords = []
  search_result = []
  // passwords = [
  //   {
  //     "account_name": "hdfc net",
  //     "number": "114627474",
  //     "password": "net@1992"
  //   },
  //   {
  //     "account_name": "beanstalk",
  //     "number": "Ajay",
  //     "password": "Ajay@1992beanstalk"
  //   },
  //   {
  //     "account_name": "UTC online bus",
  //     "number": "ajaymandrawal786gmail.com",
  //     "password": "@SiM@e@645"
  //   },
  //   {
  //     "account_name": "Gmail 17",
  //     "number": "ajaymandrawal17@gmail.com",
  //     "password": "Ajay@1992gmail17"
  //   },
  //   {
  //     "account_name": "Gmail 786",
  //     "number": "ajaymandrawal786",
  //     "password": "Ajay@1992gmail786recover"
  //   },
  //   {
  //     "account_name": "up work",
  //     "number": "login with gmail17",
  //     "password": ""
  //   },
  //   {
  //     "account_name": "up work security",
  //     "number": "Up work Security",
  //     "password": "Ajay@1992upwork"
  //   },
  //   {
  //     "account_name": "Upwork security question",
  //     "number": "elementary school name",
  //     "password": "jpnschool"
  //   },
  //   {
  //     "account_name": "skype",
  //     "number": "8393825792",
  //     "password": "ajay@skype"
  //   },
  //   {
  //     "account_name": "Freelancer",
  //     "number": "ajaymandrawal786@gmail.com",
  //     "password": "Ajay@1992freelancer"
  //   },
  //   {
  //     "account_name": "WordPress",
  //     "number": "ajaymandrawal786@gmail.com",
  //     "password": "Ajay@1992wordpress"
  //   },
  //   {
  //     "account_name": "Fevver",
  //     "number": "login with gmail17",
  //     "password": ""
  //   },
  //   {
  //     "account_name": "PNB net",
  //     "number": "JEB006646",
  //     "password": "net@1992"
  //   },
  //   {
  //     "account_name": "DeskTime",
  //     "number": "ajay@proprofs.com",
  //     "password": "c@X!5HsM"
  //   },
  //   {
  //     "account_name": "K",
  //     "number": "sam123sam123mmmmm",
  //     "password": "appname@123"
  //   },
  //   {
  //     "account_name": "HDFC App",
  //     "number": "hdfc",
  //     "password": "last four digit of roll no"
  //   },
  //   {
  //     "account_name": "Guru",
  //     "number": "ajaymandrawal786@gmail.com",
  //     "password": "Ajay@1992guru"
  //   }
  // ]
  user_id: null

  constructor(private actionSheetController: ActionSheetController,
    private databaseService: DatabaseService,
    private userDetailsService: UserDetailsService,
    private widgitsService: WidgitsService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.userDetailsService.user_details != null) {
      this.search_key = ""
         this.getAllPaswords(this.userDetailsService.user_details['user_id'])
    }
  }

  searchPassword = (event) => {
    this.search_result = this.passwords.filter(filed => filed['account_name'].toLowerCase().match(event.target.value.toLowerCase()))
  }

  getAllPaswords = (user_id) => {
    this.databaseService.getPasswords([user_id]).then(response => {
      let data = []
      for (let index = 0; index < response['rows'].length; index++) {
        data.push(JSON.parse(JSON.stringify(response['rows'].item(index))))
      }
      this.passwords = data
      this.search_result = this.passwords
    }).catch(err => {
      this.widgitsService.showLogInfo(err)
    })

  }

  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'View',
          role: 'viewDetails',
          icon: 'eye',
          handler: () => {
            this.widgitsService.showLogInfo(item)
            let navigationExtras: NavigationExtras = {
              queryParams: {
                item: JSON.stringify(item)
              },
              skipLocationChange: true
            }
            this.router.navigate(['/dashboard/view-edit-item'], navigationExtras)
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteItem(item)
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        }]
    });
    await actionSheet.present();
  }

  logout() {
    // this.storageService.presentAlert('Do you want to logout').then( data => {
    //  if(data){
    //   this.router.navigate(['/login'])
    //  }
    // })
  }

  deleteItem = (field) => {
    this.widgitsService.showLogInfo(field)
    const data = [field['user_id'], field['password_id']]
    this.databaseService.deletePassword(data).then(res => {
      this.widgitsService.showLogInfo(res)
      this.getAllPaswords(this.userDetailsService.user_details['user_id'])
      this.widgitsService.presentToast('Deleted !')
    }).catch(err => {

    })
  }
}
