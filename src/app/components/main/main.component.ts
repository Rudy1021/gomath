import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpsService } from './../../services/https.service';
import * as  xlsx from 'xlsx'
import { CookieService } from 'ngx-cookie-service';
@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private HttpsService: HttpsService,
    private cookieService: CookieService) { }
  data: any = [['姓名', '學號', '學校', '性別', '題目', '題目正解', '學生作答答案', '結果對錯', '答題時間']]
  schoolList: any = []
  schoolName: any = '請選擇學校'
  school: any = false
  topicName: any = []
  tempname:any = []
  tempdatas:any = []
  ngOnInit(): void {
    this.getSchool()
  }

  getSchool() {
    this.HttpsService.getSchools().subscribe(data => {
      data.forEach((element: any) => {
        if (element.priorityFirst == true) {
          this.schoolList.unshift(element.name)
        } else {
          this.schoolList.push(element.name)
        }
      });
    })
    if (this.cookieService.get("School") != '') {
      this.schoolName = this.cookieService.get("School")
    } else {
      this.school = true
    }
  }
  output() {
    this.HttpsService.getScores().subscribe(StudentsData => {

      var n = StudentsData.length
      for (let i = 0; i < n - 1; i++) {
        // 3
        for (let j = 0; j < n - 1 - i; j++) {
          // 4
          if (StudentsData[j].name > StudentsData[j + 1].name) {
            // 5
            const temp = StudentsData[j];
            StudentsData[j] = StudentsData[j + 1];
            StudentsData[j + 1] = temp;
          }
        }
      }
      for (let i = 0; i < n - 1; i++) {
        // 3
        for (let j = 0; j < n - 1 - i; j++) {
          // 4
          if (StudentsData[j].name == StudentsData[j + 1].name && StudentsData[j].topic.split("(")[0] == StudentsData[j + 1].topic.split("(")[0] && parseInt(StudentsData[j].topic.split("(")[1].split(")")[0]) > parseInt(StudentsData[j + 1].topic.split("(")[1].split(")")[0])) {
            // 5
            const temp = StudentsData[j];
            StudentsData[j] = StudentsData[j + 1];
            StudentsData[j + 1] = temp;
          }
        }
      }
      console.log(StudentsData)
      const wb: xlsx.WorkBook = xlsx.utils.book_new();
      StudentsData.forEach((element: any) => {
        var g = '男'
        if (element.gender == false) {
          g = '女'
        }
        var correct = '對'
        if (element.topicAnswer != element.answer) {
          correct = '錯'
        }
        if(this.topicName.find((elements:any) => elements == element.topic.split("(")[0]) == undefined) {
          this.topicName.push(element.topic.split("(")[0])
        }
        var tempdata = [element.name, element.studentId, element.school, g, element.topic, element.topicAnswer, element.answer,
          correct, element.answerSpeedSecond]
        this.data.push(tempdata)
      });


      StudentsData.forEach((element: any) => {
        if(this.tempname.find((elements:any) => elements == element.name) == undefined) {
          this.tempname.push(element.name)
        }
      });

      for(var i = 0;i < this.tempname.length;i ++) {
        this.tempdatas.push([this.tempname[i]])
      }
      StudentsData.forEach((element: any) => {
        var g = '男'
        if (element.gender == false) {
          g = '女'
        }
        for(var i = 0;i < this.tempdatas.length;i ++) {
          if(this.tempdatas[i].find((elements:any) => elements == element.school) == undefined && this.tempdatas[i].find((elements:any) => elements == element.name) == element.name){
            this.tempdatas[i].push(element.studentId, element.school, g)
          }
        }
      });
      console.log(this.tempdatas)
      const ws: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(this.data);
      /* generate workbook and add the worksheet */
      xlsx.utils.book_append_sheet(wb, ws, '學生成績');
      xlsx.utils.book_append_sheet(wb, ws, '總表');
      for(var i = 0;i<this.topicName.length;i ++) {
        xlsx.utils.book_append_sheet(wb, ws, this.topicName[i]);
      }
      /* save to file */
      //xlsx.writeFile(wb, '總學生成績.xlsx');
      Swal.fire({
        title: '成功',
        icon: 'success',
        text: '匯出成功！',
        confirmButtonText: '好的'
      })
    })
  }

  changeSchoolName(val: any) {
    if (val == '請選擇學校') {
      this.cookieService.delete('School');
      this.school = true
    } else {
      this.cookieService.set('School', val);
      this.school = false
    }
  }
}
