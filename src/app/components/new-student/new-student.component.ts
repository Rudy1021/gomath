import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {

  StudentData: any;
  studentId: string = '';
  year: string = '';
  name: string = '';
  class: string = '';
  stuldentity: number = null!;
  urbanization: number = null!;
  grade: number = null!;
  gender: boolean = true;

  constructor(private HttpsService: HttpsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.snapshot.paramMap.get('schoolId')
  }

  /** API呼叫成功的處理 */
  success(value: any) {
    console.log(value)
  }

  uploadStudent(): void {
    this.StudentData =[
      {
        "studentId" : this.studentId,
        "schoolId": Number(this.route.snapshot.paramMap.get('schoolId')),
        "year": this.year,
        "name": this.name,
        "class": this.class,
        "stuIdentity": this.stuldentity,
        "urbanization": this.urbanization,
        "grade": this.grade,
        "gender": this.gender
      }
    ]
    console.log(this.StudentData)
    this.HttpsService.uploadStudent(this.StudentData).subscribe(data =>{
      //value => this.success(value))
      Swal.fire({
        title: '成功！',
        icon: 'success',
        text: '建立成功！',
        confirmButtonText: '好的'
      }).then(res => {
        location.href = '/schoolList'
      })
    }
    )
  }
}
