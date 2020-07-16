import { Injectable } from '@angular/core';
import { AES256 } from '@ionic-native/aes-256/ngx';
import { WidgitsService } from '../widgits/widgits.service'

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

user_details = null;
 private user_secure_key = null;
 private user_secure_iv = null

  constructor(private aes256Provider : AES256,
    private widgitsService: WidgitsService
    ) { }

  generateSecureKeyAndIV = () =>{
    this.widgitsService.showLogInfo(this.user_details)
    let local_key = (parseInt(this.user_details['created_time']) * parseInt(this.user_details['user_id'])).toString()
    local_key = local_key + '' + local_key + '' +local_key
    this.widgitsService.showLogInfo(local_key)
    this.user_secure_key = local_key.substring(0,32)
    this.widgitsService.showLogInfo(this.user_secure_key.length)
    this.widgitsService.showLogInfo(this.user_secure_key)
    this.user_secure_iv =  local_key.substring(0,16)
    this.widgitsService.showLogInfo(this.user_secure_iv.length)
    this.widgitsService.showLogInfo(this.user_secure_iv)
  }

  getEncryptedPassword = (password) => {
 return   new Promise((resolve,reject) =>{
      this.aes256Provider.encrypt(this.user_secure_key, this.user_secure_iv, password).then( res => {
        resolve(res)
      }).catch(err => {
        reject(null)
      })
    })
  }

  getDecryptedPassword = (password) => {
    return  this.aes256Provider.decrypt(this.user_secure_key,this.user_secure_iv,password)
  }
}
