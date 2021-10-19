import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  account = '';
  password = '';
  hide: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  login() {
    if (this.account == 'admin' && this.password == '12345678') {
      location.href = '/main'
    } else {
      Swal.fire({
        title: '錯誤',
        icon: 'error',
        text: '登入失敗',
        confirmButtonText: '好的'
      })
    }
  }

}
