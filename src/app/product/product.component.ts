import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { appears } from '../animations/appears';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [appears]
})

export class ProductComponent implements OnInit {

  prod;
  prodId;
  middleRate;
  commentsList;

  toFindMiddleRate() {
    let max = 0;
    let count = 0;
    this.commentsList.forEach(comm => {
      if (comm.rate) {
        max += comm.rate; 
        count += 1;
      }
    });
    this.middleRate = (max / count).toFixed(1);
  }

  
  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  
  ngOnInit() {
    this.prodId = this.route.snapshot.params['id'];
    this.http.get(`http://localhost:3000/catalog/${this.prodId}`)
    .subscribe(prod => {
      this.prod = prod;
    });

    this.http.get(`http://localhost:3000/comments?productId=${this.prodId}`)
    .subscribe(commentsList => {
      this.commentsList = commentsList;
      if (this.commentsList.length > 0) {
        this.toFindMiddleRate();
      }
    });
  }

}
