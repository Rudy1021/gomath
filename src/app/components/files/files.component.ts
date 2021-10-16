import { HttpsService } from './../../services/https.service';
import { Component, OnInit } from '@angular/core';
@Component({
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  StudentsData: any;
  firstName: string = '';
  constructor(
    private HttpsService: HttpsService
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }
  getStudents(): void {
    this.HttpsService.getStudents().subscribe(StudentsData => {
      //console.log(StudentsData[0])
      this.StudentsData = StudentsData
      this.firstName = StudentsData[0].name
    })
  }

  changeName(Value: any): void {
    this.firstName = Value
    console.log(Value)
  }
  /*
  getCustomerRequests(): void {
    this.HttpsService.get()
      .subscribe(customerRequests => {
        console.log(customerRequests)
        this.showData(customerRequests.result);
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
  */
  showData(result: any) {
    throw new Error('Method not implemented.');
  }
}
