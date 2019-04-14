import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrimaryKeyServiceService {

  userPrimaryKey:string = "";

  constructor() { }

  setPrimaryKey(value:string)
  {
    this.userPrimaryKey = value;
  }

  getPrimaryKey()
  {
    return this.userPrimaryKey;
  }

}
