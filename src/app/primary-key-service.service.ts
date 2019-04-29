import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrimaryKeyServiceService {

  userPrimaryKey: string = '';
  emailId: string = '';

  isAdmin:boolean = false;

  constructor() { }

  setPrimaryKey(value: string) {
    this.userPrimaryKey = value;
  }

  getPrimaryKey() {
    return this.userPrimaryKey;
  }

  setEmailId(value: string) {
    this.emailId = value;
  }

  getEmailId() {
    return this.emailId;
  }

  setIsAdmin(value: boolean) {
    this.isAdmin = value;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

}
