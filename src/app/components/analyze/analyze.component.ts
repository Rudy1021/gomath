import { Component, OnInit } from '@angular/core';
import * as  xlsx from 'xlsx'
import { HttpsService } from './../../services/https.service';
import { ActivatedRoute } from '@angular/router';
export interface PeriodicElement {
  name: string;
  studentId: string;
  topic: string;
  answerSpeedSecond: string;
}

@Component({
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})

export class AnalyzeComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['name', 'studentId', 'topic', 'answerSpeedSecond'];
  StudentsData: any;
  dataSource: any;
  data: any = [
  ]
  constructor(
    private HttpsService: HttpsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getScores();
  }
  daochu() {
    /* generate worksheet */
    const ws: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    xlsx.writeFile(wb, '學生成績.csv');
  }
  getScores(): void {
    this.HttpsService.getScores().subscribe(StudentsData => {
      this.StudentsData = StudentsData
      StudentsData.forEach((element: any) => {
        if (element.name == this.route.snapshot.paramMap.get('name')!) {
          var studentInfo = {
            name: element.name, studentId: element.studentId, topic: element.topic, answerSpeedSecond: element.answerSpeedSecond
          }
          this.ELEMENT_DATA.push(studentInfo)
          this.dataSource = this.ELEMENT_DATA;
          var exportInfo = [element.name, element.studentId, element.topic, element.answerSpeedSecond]
          this.data.push(exportInfo)
          console.log(this.data)
        }
      });
    })
  }
}
