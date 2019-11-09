import { Component, OnInit } from '@angular/core';
import { appears } from 'src/app/animations/appears';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-access-form-to-comm',
  templateUrl: './access-form-to-comm.component.html',
  styleUrls: ['./access-form-to-comm.component.css'],
  animations: [appears]
})

export class AccessFormToCommComponent implements OnInit {

  accessFormIsVisible = true;
  commFormIsVisible = false;
  wrongEmail = false;
  rate = 0;
  prodId;
  prod;
  user;
  

  toEntToComm(email) {
    this.http.get(`http://localhost:3000/users?email=${email.value}`)
    .subscribe(email => {
      if (email[0]) {
        this.user = email[0];
        this.accessFormIsVisible = false;
        this.commFormIsVisible = true;
      } else this.wrongEmail = true;
    });
  }


  change(sign) {
    if (this.rate < 5 && sign) {
      this.rate++;
    } else if (this.rate > 0 && !sign) {
      this.rate--;
    }
  }


  toAddComm(commText) {
    let comment = {
      productId: this.prodId,
      createdBy: {
        id: this.user.id,
        username: this.user.name
      },
      rate: this.rate,
      text: commText.value,
      date: new Date().toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
    this.http.post(`http://localhost:3000/comments`, comment)
    .subscribe(() => {
        this.router.navigate(['/catalog']);
    });
  }



  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.prodId = this.route.snapshot.params['id'];
  }

}
