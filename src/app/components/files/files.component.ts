import { HttpsService } from './../../services/https.service';
import { Component, OnInit } from '@angular/core';
@Component({
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  StudentsData: any;
  none: boolean = true;
  filters1: any = ['無', '作答時間', '性別', '作答結果', '學生姓名', '作答大題'];
  filters2: any = [];
  no: boolean = true;
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
    if (Value == '無') {
      this.filters2 = [];
      this.none = true
    } else {
      console.log('a')
      this.filters2 = ['無', '作答時間', '性別', '作答結果', '學生姓名', '作答大題'];
      var option1 = this.filters1.indexOf(Value)
      this.filters2.splice(option1, 1);
      this.none = false
    }
  }
  non(Value: any): void {
    if (Value == '無') {
      this.no = true
    } else {
      this.no = false
    }
  }
}
