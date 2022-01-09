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
  tempname: any = []
  StudentsData: any = []
  ngOnInit(): void {
    this.getSchool()
    this.output()
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
    this.StudentsData = []
    this.tempname = []
    if (this.schoolName != '請選擇學校') {
      this.HttpsService.getScores().subscribe(StudentsData => {
        this.StudentsData = StudentsData
        console.log(StudentsData)
      })
    }
  }

  changeSchoolName(val: any) {
    if (val == '請選擇學校') {
      this.cookieService.delete('School');
      this.school = true
    } else {
      this.cookieService.set('School', val);
      this.school = false
      this.output()
    }
  }
  makexlsx() {
    var n = this.StudentsData.length
    for (let i = 0; i < n - 1; i++) {
      // 3
      for (let j = 0; j < n - 1 - i; j++) {
        // 4
        if (this.StudentsData[j].name > this.StudentsData[j + 1].name) {
          // 5
          const temp = this.StudentsData[j];
          this.StudentsData[j] = this.StudentsData[j + 1];
          this.StudentsData[j + 1] = temp;
        }
      }
    }
    for (let i = 0; i < n - 1; i++) {
      // 3
      for (let j = 0; j < n - 1 - i; j++) {
        // 4
        if (this.StudentsData[j].name == this.StudentsData[j + 1].name && this.StudentsData[j].topic.split("(")[0] == this.StudentsData[j + 1].topic.split("(")[0] && parseInt(this.StudentsData[j].topic.split("(")[1].split(")")[0]) > parseInt(this.StudentsData[j + 1].topic.split("(")[1].split(")")[0])) {
          // 5
          const temp = this.StudentsData[j];
          this.StudentsData[j] = this.StudentsData[j + 1];
          this.StudentsData[j + 1] = temp;
        }
      }
    }
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    this.StudentsData.forEach((element: any) => {
      var g = '男'
      if (element.gender == false) {
        g = '女'
      }
      var correct = '對'
      if (element.topicAnswer != element.answer) {
        correct = '錯'
      }
      if (this.topicName.find((elements: any) => elements == element.topic.split("(")[0]) == undefined) {
        this.topicName.push(element.topic.split("(")[0])
      }
      var tempdata = [element.name, element.studentId, element.school, g, element.topic, element.topicAnswer, element.answer,
        correct, element.answerSpeedSecond]
      this.data.push(tempdata)
    });
    const ws1: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(this.data);
    xlsx.utils.book_append_sheet(wb, ws1, '學生成績');


    var n = this.StudentsData.length
    for (let i = 0; i < n - 1; i++) {
      // 3
      for (let j = 0; j < n - 1 - i; j++) {
        // 4
        if (this.StudentsData[j].topic > this.StudentsData[j + 1].topic) {
          // 5
          const temp = this.StudentsData[j];
          this.StudentsData[j] = this.StudentsData[j + 1];
          this.StudentsData[j + 1] = temp;
        }
      }
    }
    for (let i = 0; i < n - 1; i++) {
      // 3
      for (let j = 0; j < n - 1 - i; j++) {
        // 4
        if (parseInt(this.StudentsData[j].topic.split("(")[1].split(")")[0]) > parseInt(this.StudentsData[j + 1].topic.split("(")[1].split(")")[0]) && this.StudentsData[j].topic.split("(")[0] == this.StudentsData[j + 1].topic.split("(")[0]) {
          // 5
          const temp = this.StudentsData[j];
          this.StudentsData[j] = this.StudentsData[j + 1];
          this.StudentsData[j + 1] = temp;
        }
      }
    }
    this.data = []
    var topic: any = []
    this.data.push(['姓名', '學號', '學校', '性別'])
    var indexOftopic = 0
    for (var w = 0; w < this.StudentsData.length; w++) {
      var g = '男'
      if (this.StudentsData[w].gender == false) {
        g = '女'
      }
      if (this.tempname.indexOf(this.StudentsData[w].name) == -1) {
        this.tempname.push(this.StudentsData[w].name)
      }
      if (w % this.tempname.length == 0) {
        indexOftopic++
      }
      topic.push(this.StudentsData[w].topic.split("(")[0])
      var correct = '對'
      if (this.StudentsData[w].topicAnswer != this.StudentsData[w].answer) {
        correct = '錯'
      }
      if (topic[topic.length - 1] == topic[topic.length - 2] || topic.length == 1) {
        if (!this.StudentsData[w].topic.split("(")[1].split(")")[0].match(/練習[0-9]*/)) {
          if (this.StudentsData[w].topic.split("(")[1].split(")")[0] != '說明') {
            if (this.data[0].indexOf("第" + this.StudentsData[w].topic.split("(")[1].split(")")[0] + "題結果對錯") == -1) {
              this.data[0].push("第" + this.StudentsData[w].topic.split("(")[1].split(")")[0] + "題結果對錯", "第" + this.StudentsData[w].topic.split("(")[1].split(")")[0] + "題答題時間")
            }
            if (indexOftopic == this.StudentsData[w].topic.split("(")[1].split(")")[0]) {
              if (this.tempname.indexOf(this.StudentsData[w].name) != -1 && this.tempname.indexOf(this.StudentsData[w].name) < this.data.length - 1) {
                this.data[this.tempname.indexOf(this.StudentsData[w].name) + 1].push(correct, this.StudentsData[w].answerSpeedSecond)
              } else {
                this.data.push([this.StudentsData[w].name, this.StudentsData[w].studentId, this.StudentsData[w].school, g, correct, this.StudentsData[w].answerSpeedSecond])
              }
            } else {
              this.data[this.tempname.indexOf(this.StudentsData[w].name) + 1].push('未作答', '未作答')
            }
          }
        }
      } else {
        indexOftopic = 1
        const ws1: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(this.data);
        xlsx.utils.book_append_sheet(wb, ws1, topic[topic.length - 2]);
        topic = []
        for (var i = 1; i < this.data.length; i++) {
          var temparray = [this.data[i][0], this.data[i][1], this.data[i][2], this.data[i][3]]
          this.data[i] = []
          this.data[i].push(temparray[0], temparray[1], temparray[2], temparray[3])
        }
        this.data[0] = ['姓名', '學號', '學校', '性別']
        this.data[this.tempname.indexOf(this.StudentsData[w].name) + 1].push(correct, this.StudentsData[w].answerSpeedSecond)
      }
    }
    /* generate workbook and add the worksheet */
    /*
    for (var i = 0; i < this.topicName.length; i++) {
      xlsx.utils.book_append_sheet(wb, ws, this.topicName[i]);
    }
    */
    /* save to file */
    xlsx.writeFile(wb, '總學生成績.xlsx');
    Swal.fire({
      title: '成功',
      icon: 'success',
      text: '匯出成功！',
      confirmButtonText: '好的'
    })
  }
}


