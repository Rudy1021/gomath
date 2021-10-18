import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
  StudentsData: any;
  constructor(private HttpsService: HttpsService) { }

  ngOnInit(): void {
    this.getStudents()
  }
  getStudents(): void {
    this.HttpsService.getStudents().subscribe(StudentsData => {
      console.log(StudentsData)
      this.StudentsData = StudentsData
    })
  }
}
