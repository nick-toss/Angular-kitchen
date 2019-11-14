import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { appears } from '../animations/appears';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [appears]
})

export class RegistrationComponent implements OnInit {

  @ViewChild('file') file: ElementRef;
  regForm: FormGroup;

  toAddUser(regForm) {
    let user = {
      name: regForm.controls.name.value,
      email: regForm.controls.email.value,
      password: regForm.controls.password.value,
      file: this.file.nativeElement.files[0].name
    };

    this.http.post('http://localhost:3000/users', user)
    .subscribe(() => {});

    this.file.nativeElement.previousSibling.lastChild.data = 'Прикрепите файл';
    this.router.navigate(['/catalog']);
  }


  toCheckEmail(control: FormControl): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`http://localhost:3000/users?email=${control.value}`)
      .subscribe(user => {
        if (user[0]) {
          resolve({
            emailIsUsed: true
          });
        }
        resolve(null);
      })
    })
  }


  toCheckFileSize(): Promise<any> {
    return new Promise(resolve => {
      let file = this.file.nativeElement;
      if ((file.files[0].size / 1024 / 1024) > 25) {
        file.previousSibling.lastChild.data = 'Прикрепите файл';
        resolve({
          overSize: true
        });
      } else {
        file.previousSibling.lastChild.data = file.files[0].name;
        resolve(null);
      } 
    })  
  }


  toCheckFormat(): Promise<any> {
    return new Promise((resolve) => {
      let file = this.file.nativeElement;
      let format = ['rar', 'txt', 'rtf', 'doc', 'docx', 'pdf', 'otd', 'html', 'js'].find(item => 
        item == file.files[0].name.split('.').pop()
      );
      if (!format) {
        file.previousSibling.lastChild.data = 'Прикрепите файл';
        resolve({
          unsuitableFormat: true
        });
      }
      resolve(null);
    })
  }


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.regForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email], this.toCheckEmail.bind(this)),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      file: new FormControl(null, Validators.required, [this.toCheckFileSize.bind(this), this.toCheckFormat.bind(this)])
    })
  }

}
