import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
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
      this.Id = data[0].studentId
      data.forEach((element: any) => {
        this.studentId.push(element.studentId)
      });
    })
  }
  search() {
    if (this.Id != '') {
      location.href = '/searchPage/' + this.Id
    }
  }
}
