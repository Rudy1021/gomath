import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  fileName: string = '';
  studentInfo: any;
  constructor(private HttpsService: HttpsService,) { }

  ngOnInit(): void {
  }
  changeListener(event: any) {
    var files: File = event.target.files[0];
    if (files) {
      let reader: FileReader = new FileReader();
      reader.readAsText(files);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        this.studentInfo = csv.split(',')
      }
    }
  }
  sendScore() {
    var sendInfo = [{
      studentId: this.studentInfo[0], schoolId: 0,
      name: this.studentInfo[1], class: this.studentInfo[2],
      gender: true
    }]
    this.HttpsService.uploadProjectRequest(sendInfo).subscribe(res => {
      if (res.status == 200) {
        Swal.fire({
          title: '成功',
          icon: 'success',
          text: '新增成功！即將返回主頁面',
          confirmButtonText: '好的'
        }).then((result) => {
          location.href = '/main'
        })
      } else {
        Swal.fire({
          title: '錯誤',
          icon: 'error',
          text: '新增失敗！請檢查帳號是否重複！',
          confirmButtonText: '好的'
        })
      }
    }, err => {
      if (err.status == 500) {
        Swal.fire({
          title: '錯誤',
          icon: 'error',
          text: '新增失敗！請檢查帳號是否重複！',
          confirmButtonText: '好的'
        })
      }
    })
  }
}
