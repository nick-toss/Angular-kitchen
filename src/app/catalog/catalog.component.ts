import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appears } from '../animations/appears';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  animations: [appears]
})

export class CatalogComponent implements OnInit {

  catalog;
  commentsList;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`http://localhost:3000/catalog`)
    .subscribe(catalog => {

      this.catalog = catalog;
      this.http.get(`http://localhost:3000/comments`)
      .subscribe(commentsList => {
        this.commentsList = commentsList;
        this.catalog.forEach(prod => {
          prod.commentsList = [];
          this.commentsList.forEach(comm => {
            if (comm.productId == prod.id) {
              prod.commentsList.push(comm);
            }
          });
        });
        
        this.catalog.forEach(prod => {
          let max = 0;
          let count = 0;
          prod.commentsList.forEach(comm => {
            if (comm.rate) {
              max += comm.rate;
              count += 1;
            }
          });
          if (max) {
            prod.middleRate = (max / count).toFixed(1);
          } else prod.middleRate = 0;
        }); 
      });
      
    });
  }

}
