import { HttpsService } from './../../services/https.service';
import { Component, OnInit } from '@angular/core';
@Component({
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  StudentsData: any;
  filters1: any = ['作答時間', '性別', '作答結果', '學生姓名', '作答大題'];
  filters2: any = ['性別', '作答結果', '學生姓名', '作答大題'];
  constructor(
    private HttpsService: HttpsService
  ) { }

  ngOnInit(): void {
    this.getScores();
  }
  getScores(): void {
    this.HttpsService.getScores().subscribe(StudentsData => {
      console.log(this.StudentsData)
    })
  }

  changeName(Value: any): void {
    this.filters2 = ['作答時間', '性別', '作答結果', '學生姓名', '作答大題'];
    var option1 = this.filters1.indexOf(Value)
    this.filters2.splice(option1, 1);
  }
}
