import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as  xlsx from 'xlsx'
@Component({
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  fileName: string = '';
  studentInfo: any;
  data: any = [['學號', '姓名', '班級', '性別']]
  constructor(private HttpsService: HttpsService,) { }

  ngOnInit(): void {
    console.log(this.data)
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
  daochu() {
    const ws: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(this.data);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, '範例檔案.csv');
  }
  sendScore() {
    var gender = true;
    if (this.studentInfo[3] == '女') {
      gender = false
    }
    var sendInfo = [{
      studentId: this.studentInfo[0], schoolId: 0,
      name: this.studentInfo[1], class: this.studentInfo[2],
      gender: gender
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
