import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  StudentData: any;
  studentId: string = '';
  name: string = '';
  class: string = '';
  schoolName: string = '';
  gender: boolean = true;
  accountId: string = '';
  constructor(private HttpsService: HttpsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.studentId)
    this.getStudents()
  }
  getStudents(): void {
    this.HttpsService.getStudents().subscribe(StudentData => {
      StudentData.forEach((element: any) => {
        if (element.accountId == this.route.snapshot.paramMap.get('accountId')!) {
          this.name = element.name
          this.class = element.class
          this.studentId = element.studentId
          this.schoolName = element.schoolName
          this.gender = element.gender
          this.accountId = element.accountId
          this.StudentData = element

        }
      });
    })
    console.log(this.studentId)
  }
  updateStudents(): void {
    console.log(this.studentId)
    var update = [{
      "path": "/StudentId",
      "op": "replace",
      "value": this.studentId
    },
    {
      "path": "/name",
      "op": "replace",
      "value": this.name
    },
    {
      "path": "/class",
      "op": "replace",
      "value": this.class
    },
    {
      "path": "/gender",
      "op": "replace",
      "value": this.gender
    }]
    console.log(update)
    this.HttpsService.updateStudent(this.accountId, update).subscribe(res => {

      if (res.status == 200 && res.body == true) {
        Swal.fire({
          title: '成功',
          icon: 'success',
          text: '修改成功！',
          confirmButtonText: '好的'
        }).then((res) => {
          location.href = '/StudentInfo'
        })
      } else {
        Swal.fire({
          title: '錯誤',
          icon: 'error',
          text: '修改失敗！',
          confirmButtonText: '好的'
        })
      }
    })
  }
}
