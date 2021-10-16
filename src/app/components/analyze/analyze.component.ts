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
    this.getStudents();
    console.log(this.route.snapshot.paramMap.get('name')!)
  }
  daochu() {
    /* generate worksheet */
    const ws: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(this.data);
    const ws2: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.utils.book_append_sheet(wb, ws2, 'Sheet2');

    console.log(wb)
    /* save to file */
    xlsx.writeFile(wb, '學生成績.xlsx');
  }
  getStudents(): void {
    this.HttpsService.getStudents().subscribe(StudentsData => {
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
        }
      });
    })
  }
}
