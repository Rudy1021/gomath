import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-ans-page',
  templateUrl: './ans-page.component.html',
  styleUrls: ['./ans-page.component.scss']
})
export class AnsPageComponent implements OnInit {
  studentId: any = []
  Id: any = ''
  constructor(private HttpsService: HttpsService) { }

  ngOnInit(): void {
    this.getStudents()
  }
  getStudents() {
    this.HttpsService.getStudents().subscribe((data: any) => {
      data.forEach((element: any) => {
        var name = element.studentId + '(' + element.name + ')'
        this.studentId.push(name)
      });
      this.Id = this.studentId[0]
    })
  }
  search() {
    console.log(this.Id)
    if (this.Id != '') {
      this.HttpsService.getSearch("student_id=" + this.Id).subscribe((res: any) => {
        if (res.length <= 0) {
          Swal.fire({
            title: '錯誤',
            icon: 'error',
            text: '查無資料！',
            confirmButtonText: '好的'
          })
        } else {
          location.href = '/searchPage/' + this.Id
        }
      })
    }
  }
}
