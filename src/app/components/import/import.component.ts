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
  studentTemp: any;
  studentInfo: any = [];
  data: any = [['學號', '姓名', '班級', '性別']]
  constructor(private HttpsService: HttpsService) { }

  ngOnInit(): void {
  }
  changeListener(event: any) {
    var files: File = event.target.files[0];
    if (files) {
      let reader: FileReader = new FileReader();
      reader.readAsText(files);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        this.studentTemp = csv.split(',')
        console.log(this.studentTemp)
        if (this.studentTemp[0] == '學號') {
          this.studentTemp.splice(0, 3)
          this.studentTemp[0] = this.studentTemp[0].split('\r\n')[1]
        }
        this.studentTemp.forEach((element: any) => {
          if (element.split('\r\n').length > 1) {
            this.studentInfo.push(element.split('\r\n')[0])
            if (element.split('\r\n')[1] != '') {
              this.studentInfo.push(element.split('\r\n')[1])
            }
          } else {
            this.studentInfo.push(element)
          }
        });
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
    var count = this.studentInfo.length / 4
    var sendInfo = []
    for (var i = 0; i < count; i++) {
      var gender = true
      if (this.studentInfo[3 + 4 * i] == '女') {
        gender = false
      }
      var Info = {
        studentId: this.studentInfo[0 + 4 * i], schoolId: 1,
        name: this.studentInfo[1 + 4 * i], class: this.studentInfo[2 + 4 * i],
        gender: gender
      }
      sendInfo.push(Info)
    }
    console.log(sendInfo.length)
    if (sendInfo.length >= 1) {
      this.HttpsService.uploadProjectRequest(sendInfo).subscribe(res => {
        if (res.status == 200 && res.body == true) {
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
            text: '新增失敗！請檢查學號是否重複！',
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
    } else {
      Swal.fire({
        title: '錯誤',
        icon: 'error',
        text: '未選擇檔案！',
        confirmButtonText: '好的'
      })
    }

  }
}
