import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
  StudentsData: any;
  dataSource: any = [];
  constructor(private HttpsService: HttpsService) { }
  displayedColumns: any = ['姓名', '學號', '學校名稱', '年級', '班級', '登入狀態', '選項']
  ELE: any = []
  ngOnInit(): void {
    this.getStudents()
  }
  getStudents(): void {
    this.HttpsService.getStudents().subscribe(StudentsData => {
      console.log(StudentsData)
      StudentsData.forEach((element: any) => {
        var status = ''
        if (element.status == 0) {
          status = '未登入'
        } else if (element.status == 1) {
          status = '已登入'
        } else if (element.status == 2) {
          status = '作答完成'
        }
        var datas = {
          name: element.name,
          studentId: element.studentId,
          schoolName: element.schoolName,
          grade: element.grade,
          class: element.class,
          status: status
        }
        this.ELE.push(datas)
      });
      this.dataSource = this.ELE
    })
  }
  logout(Id: any) {
    Swal.fire({
      title: '警告！',
      icon: 'warning',
      text: '確定要登出嗎？',
      confirmButtonText: '確定',
      showCancelButton: true,
      cancelButtonText: '取消'
    }).then(res => {
      var update = [{
        "op": "replace",
        "path": "/Status",
        "value": 0
      },
      {
        "op": "replace",
        "path": "/Token",
        "value": ""
      }]
      this.HttpsService.logouts(Id, update).subscribe(res => {
        Swal.fire({
          title: '成功',
          icon: 'success',
          text: '強制登出成功！',
          confirmButtonText: '好的'
        }).then((res) => {
          location.reload
        })
      })
    })
  }
}
