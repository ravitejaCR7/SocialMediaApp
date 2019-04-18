import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrimaryKeyServiceService {

  userPrimaryKey: string = '';
  emailId: string = '';

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

}
