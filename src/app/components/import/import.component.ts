import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
@Component({
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  fileName: string = '';
  studentInfo: any;
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
        this.studentInfo = csv.split(',')
      }
    }
  }
  sendScore() {
    var sendInfo = [{
      accountId: this.studentInfo[0], studentId: this.studentInfo[1], schoolId: 0,
      name: this.studentInfo[2], class: this.studentInfo[3],
      gender: true
    }]
    this.HttpsService.uploadProjectRequest(sendInfo).subscribe(res => {
      if (res.status == 200) {
        alert("新增成功！即將返回主頁面")
        location.href = '/main'
      } else {
        alert('新增失敗！請檢查帳號是否重複！')
      }
    }, err => {
      if (err.status == 500) {
        alert('新增失敗！請檢查帳號是否重複！')
      }
    })
  }
}
