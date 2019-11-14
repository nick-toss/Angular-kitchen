import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { appears } from '../animations/appears';


@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.scss'],
  animations: [appears]
})


export class EntranceComponent implements OnInit {

  entForm: FormGroup;
  wrongData;

  toCheckUser(entForm) {
    let userEmail = entForm.controls.email.value;
    let userPass = entForm.controls.password.value;
    this.http.get(`http://localhost:3000/users?email=${userEmail}`)
    .subscribe(user => {
      if (user[0]) {
        if (user[0].password == userPass) {
          this.router.navigate(['/catalog']);
        }
      } else {
        this.wrongData = true;
      }
    });   
  }
  

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.entForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

}
