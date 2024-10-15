import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit{

  constructor() {}

  @Input() postData: Object | any;

  ngOnInit(): void {
    console.log(this.postData);
  }

}
