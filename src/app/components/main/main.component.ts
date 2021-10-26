import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  output() {
    Swal.fire({
      title: '成功',
      icon: 'success',
      text: '匯出成功！',
      confirmButtonText: '好的'
    })
  }
}
