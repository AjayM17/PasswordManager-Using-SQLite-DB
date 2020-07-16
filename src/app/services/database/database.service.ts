import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { WidgitsService } from '../widgits/widgits.service'


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  storage_db: SQLiteObject
  DATABASE_NAME = 'password_db.db'
  LOCATION = 'default'
  INSERT_USER_TABLE: string = 'INSERT INTO users ( phone, password) VALUES (?,?);'

  constructor(private sqlite: SQLite,
    private widgitsService: WidgitsService
  ) { }

  test = () => {
    console.log('test')
  }

  createDatabase = () => {
    this.sqlite.create({
      name: this.DATABASE_NAME,
      location: this.LOCATION
    }).then((db: SQLiteObject) => {
      this.storage_db = db
      this.widgitsService.showLogInfo(db)
      this.createTables()
    }).catch((err) => {
      this.widgitsService.showLogInfo(err)
      console.log(err)
    })
  }

  createTables = () => {
    this.createUserTable()
    this.createPasswordTable()
  }

  createUserTable = () => {
    const query = 'CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, created_time TEXT NOT NULL UNIQUE, phone TEXT NOT NULL UNIQUE, password TEXT NOT NULL);'
    this.storage_db.executeSql(query).then((response: SQLiteObject) => {
      this.widgitsService.showLogInfo(response)
    }).catch(err => {
      this.widgitsService.showLogInfo(err)
    })
  }

  createPasswordTable = () => {
    const query = 'CREATE TABLE IF NOT EXISTS passwords (password_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, created_time TEXT NOT NULL UNIQUE, user_id TEXT NOT NULL,  account_name TEXT NOT NULL,account_id TEXT, account_password TEXT);'
    this.storage_db.executeSql(query).then((response: SQLiteObject) => {
      this.widgitsService.showLogInfo(response)

    }).catch(err => {
      this.widgitsService.showLogInfo(err)
    })
  }
  


  createUser = (data: any[]) => {
    const query = 'INSERT INTO users ( created_time, phone, password) VALUES (?,?,?);'
    this.storage_db.executeSql(query, data).then(response => {
      this.widgitsService.showLogInfo(response)
    }).catch(err => {
      this.widgitsService.showLogInfo(err)
    })
  }


  createPassword = (data: any[]) => {
    const query = 'INSERT INTO passwords ( created_time, user_id, account_name, account_id, account_password) VALUES (?,?,?,?,?);'
    return this.storage_db.executeSql(query, data)
  }

  updatePassword = (data: any[]) => {
    const query = 'UPDATE  passwords  SET account_name = ?, account_id = ?, account_password = ? WHERE password_id = ? AND user_id =  ?;'
    return this.storage_db.executeSql(query, data)
  }

  deletePassword = (data: any[]) => {
    const query = 'DELETE FROM passwords WHERE user_id = ? AND password_id = ?;'
    return this.storage_db.executeSql(query, data)
  }


  getUsers = (data) => {
    const query = 'SELECT * FROM users WHERE phone = ? AND password = ?;'
    return this.storage_db.executeSql(query, data)
  }

  getPasswords = (data) => {
    const query = 'SELECT * FROM passwords WHERE user_id = 1;'
    return this.storage_db.executeSql(query, [])
  }


  // checkIsTableExists = (table_name) =>{
  //   const CHECK_TABLE = 'SELECT name FROM sqlite_master WHERE type=? AND name= ?'
  //   this.storage_db.executeSql(CHECK_TABLE,['table', table_name]).then( response =>{
  //     console.log(response)
  //   }).catch( err => {
  //     console.log(err)
  //   })
  // }
}
