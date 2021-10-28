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
    var arg = this.route.snapshot.paramMap.get('arg')!
    if (arg != 'none') {
      /*
      a = time
      g = gender
      I = studentId
      s = topicId
      c = correct
      */
      var a1 = ''
      var a2 = ''
      var args = arg.split('and')
      switch (args[0].slice(0, 1)) {
        case 'a':
          a1 = 'startTime=' + args[0].split('a')[1] + '&EndTime=' + args[0].split('a')[1]
          break
        case 'g':
          a1 = 'Gender=' + args[0].split('g')[1]
          break
        case 'I':
          a1 = 'studentId=' + args[0].split('I')[1]
          break
        case 's':
          a1 = 'TopicId=' + args[0].split('s')[1]
          break
        case 'c':
          a1 = 'correct=' + args[0].split('c')[1]
          break
      }
      if (args.length > 1) {
        switch (args[1].slice(0, 1)) {
          case 'a':
            a2 = 'startTime=' + args[1].split('a')[1] + '&EndTime=' + args[1].split('a')[1]
            break
          case 'g':
            a2 = 'Gender=' + args[1].split('g')[1]
            break
          case 'I':
            a2 = 'studentId=' + args[1].split('I')[1]
            break
          case 's':
            a2 = 'TopicId=' + args[1].split('s')[1]
            break
          case 'c':
            a2 = 'correct=' + args[1].split('c')[1]
            break
          default:
            a2 = ''
            break
        }
      }
      var rou = ''
      if (a2 != '') {
        rou = a1 + '&' + a2
      } else {
        rou = a1
      }
      this.HttpsService.getSearch(rou).subscribe(StudentsData => {
        this.StudentsData = StudentsData
        StudentsData.forEach((element: any) => {
          var studentInfo = {
            name: element.name, studentId: element.studentId, topic: element.topic, answerSpeedSecond: element.answerSpeedSecond
          }
          console.log(this.ELEMENT_DATA)
          this.ELEMENT_DATA.push(studentInfo)
          this.dataSource = this.ELEMENT_DATA;
          console.log(this.dataSource)
          var exportInfo = [element.name, element.studentId, element.topic, element.answerSpeedSecond]
          this.data.push(exportInfo)
        });
      })
    } else {
      this.HttpsService.getScores().subscribe(StudentsData => {
        this.StudentsData = StudentsData
        StudentsData.forEach((element: any) => {
          var studentInfo = {
            name: element.name, studentId: element.studentId, topic: element.topic, answerSpeedSecond: element.answerSpeedSecond
          }
          this.ELEMENT_DATA.push(studentInfo)
          this.dataSource = this.ELEMENT_DATA;
          var exportInfo = [element.name, element.studentId, element.topic, element.answerSpeedSecond]
          this.data.push(exportInfo)
        });
      })
    }
  }
}
