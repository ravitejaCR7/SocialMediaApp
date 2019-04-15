import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
selectedPrivacySettings: String = '';
privacyList: any = [
  'Public',
  'Private',
  'Friends',
  'Friends of friends'
];
  constructor() { }

  ngOnInit() {
  }
  privacyChangedHandler(event: any){
    this.selectedPrivacySettings = event.target.value;
    console.log(this.selectedPrivacySettings);
  }

}
