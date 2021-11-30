import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {

  constructor(private HttpsService: HttpsService) { }
  displayedColumns: string[] = ['name', 'option', 'priorityFirst'];
  schoolList: any = []
  datasource: any
  ngOnInit(): void {
    this.getSchool()
  }

  getSchool() {
    this.HttpsService.getSchools().subscribe(data => {
      data.forEach((element: any) => {
        var list = { name: element.name, Id: element.schoolId, priorityFirst: element.priorityFirst }
        if (element.priorityFirst == true) {
          this.schoolList.unshift(list)
        } else {
          this.schoolList.push(list)
        }
      });
      this.datasource = this.schoolList
    })
  }
  priorityFirst(id: any) {
    Swal.fire({
      title: '警告！',
      icon: 'warning',
      text: '確定要將此學校設為優先嗎？',
      confirmButtonText: '好的',
      showCancelButton: true,
      cancelButtonText: '取消'
    }).then(res => {
      if (res.isConfirmed) {
        this.HttpsService.setPriority(id).subscribe(data => {
          Swal.fire({
            title: '成功！',
            icon: 'success',
            text: '修改成功！',
            confirmButtonText: '好的'
          }).then(res => {
            location.reload()
          })
        })
      }
    })

  }
}
