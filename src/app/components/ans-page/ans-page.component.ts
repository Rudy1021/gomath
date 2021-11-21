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
  studentIds: any = []
  constructor(private HttpsService: HttpsService) { }

  ngOnInit(): void {
    this.getStudents()
  }
  getStudents() {
    this.HttpsService.getScores().subscribe((data: any) => {
      data.forEach((element: any) => {
        if (this.studentIds.find((elements: any) => elements == element.studentId) == undefined) {
          var name = element.studentId + '(' + element.name + ')'
          this.studentId.push(name)
          this.studentIds.push(element.studentId)
        }
      });
      this.Id = this.studentId[0]
    })
  }
  search() {
    if (this.Id != '') {
      location.href = '/searchPage/' + this.Id.split('(')[0]
    }
  }
}
