import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { appears } from 'src/app/animations/appears';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [appears]
})

export class CommentsComponent implements OnInit {

  prodId;
  commentsList;

  toAddComm() {
    this.router.navigate(['access-form-to-comm', this.prodId], { relativeTo: this.route });
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() { 
    this.prodId = this.route.snapshot.params['id'];
    this.http.get(`http://localhost:3000/comments?productId=${this.prodId}`)
    .subscribe(commentsList => {
      this.commentsList = commentsList;
    });
  }

}

