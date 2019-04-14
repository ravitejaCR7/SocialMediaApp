import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  content: string = "";
  constructor() { }

  ngOnInit() {
  }
posttext(event:any){
  this.content = event.target.value;
}
postcontent(){
  console.log(this.content);
}
}
