import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  postData: any;
  similarPostArray: Array<object> | any;

  constructor(private route: ActivatedRoute, private postService: PostsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(val => {

      this.postService.countViews(val['id']);

      this.postService.loadOnePost(val['id']).subscribe((post: any) => {
        this.postData = post;
        this.loadSimilarPost(this.postData.category.categoryId);
      });
    });
  }

  loadSimilarPost(categoryId: any) {
    this.postService.loadSimilar(categoryId).subscribe(val => {
      this.similarPostArray = val;
    });
  }

}
