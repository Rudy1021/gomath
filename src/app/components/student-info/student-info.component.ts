import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpsService } from './../../services/https.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CookieService } from 'ngx-cookie-service';
import { Sort } from '@angular/material/sort';
import * as  xlsx from 'xlsx'
//import { fileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],

})
export class StudentInfoComponent implements OnInit {

  StudentsData: any;
  dataSource: any = [];

  constructor(
    private HttpsService: HttpsService,
    private cookieService: CookieService,
  ) { }
  displayedColumns: any = ['name', 'studentId', 'school', 'grade', 'class', 'status', 'option']
  ELE: any = []
  studentId: any = []
  school = { "name": '', "Id": '' }

  ngOnInit(): void {
    this.getStudents()
  }

  testdata:any = [
    "圖形辨識計數","規則圖形計數","隨機圖型計數","圖形合成計數","數字分解1",
    "數字分解2","加減法","加法填空","比大小","數字序列",
    "圖形序列","數值估計","數線估計","乘法","數字記憶廣度-順背",
    "數字記憶廣度-逆背","詞語記憶","視覺工作記憶","視覺空間工作記憶"
  ]

  Template: any = {
    "學校": "",
    "班級": "",
    "姓名": "",
    "性別": "",
    "圖形辨識計數(總秒數)": "",
    "圖形辨識計數(答對數)": "",
    "圖形辨識計數(完成數)": "",
    "規則圖形計數(總秒數)": "",
    "規則圖形計數(答對數)": "",
    "規則圖形計數(完成數)": "",
    "隨機圖型計數(總秒數)": "",
    "隨機圖型計數(答對數)": "",
    "隨機圖型計數(完成數)": "",
    "圖形合成計數(總秒數)": "",
    "圖形合成計數(答對數)": "",
    "圖形合成計數(完成數)": "",
    "數字分解1(總秒數)": "",
    "數字分解1(答對數)": "",
    "數字分解1(完成數)": "",
    "數字分解2(總秒數)": "",
    "數字分解2(答對數)": "",
    "數字分解2(完成數)": "",
    "加減法(總秒數)": "",
    "加減法(答對數)": "",
    "加減法(完成數)": "",
    "加法填空(總秒數)": "",
    "加法填空(答對數)": "",
    "加法填空(完成數)": "",
    "比大小(總秒數)": "",
    "比大小(答對數)": "",
    "比大小(完成數)": "",
    "數字序列(總秒數)": "",
    "數字序列(答對數)": "",
    "數字序列(完成數)": "",
    "圖形序列(總秒數)": "",
    "圖形序列(答對數)": "",
    "圖形序列(完成數)": "",
    "數值估計(總秒數)": "",
    "數值估計(答對數)": "",
    "數值估計(完成數)": "",
    "數線估計(總秒數)": "",
    "數線估計(答對數)": "",
    "數線估計(完成數)": "",
    "乘法(總秒數)": "",
    "乘法(答對數)": "",
    "乘法(完成數)": "",
    "數字記憶廣度-順背(總秒數)": "",
    "數字記憶廣度-順背(答對數)": "",
    "數字記憶廣度-順背(完成數)": "",
    "數字記憶廣度-逆背(總秒數)": "",
    "數字記憶廣度-逆背(答對數)": "",
    "數字記憶廣度-逆背(完成數)": "",
    "詞語記憶(總秒數)": "",
    "詞語記憶(答對數)": "",
    "詞語記憶(完成數)": "",
    "視覺工作記憶(總秒數)": "",
    "視覺工作記憶(答對數)": "",
    "視覺工作記憶(完成數)": "",
    "視覺空間工作記憶(總秒數)": "",
    "視覺空間工作記憶(答對數)": "",
    "視覺空間工作記憶(完成數)": "",
  }


  testData = [
    { "name": "lin", "score": "100", "test": "1" },
    { "name": "chen", "score": "50", "test": "2" }
  ]

  excelData: any[] = []

  test(): void {
    this.getStudentsScores()
  }

  getStudentsScores(): void {
    this.HttpsService.getStudentsScores(this.school['name']).subscribe(StudentsData => {
      StudentsData.forEach((element: any) => {
        var singleData:any = {}
        // personal information
        singleData["學校"] = element["school"]
        singleData["班級"] = element["class"]
        singleData["姓名"] = element["name"]
        if (element["gender"] == true) {
          singleData["性別"] = "男"
        } else { singleData["性別"] = "女" }
        // personal grade distribution
        for(var i in this.testdata){
          singleData[`${this.testdata[i]}(總秒數)`] = element[`topicTime${Number(i)+1}`]
          singleData[`${this.testdata[i]}(答對數)`] = element[`topicCorrect${Number(i)+1}`]
          singleData[`${this.testdata[i]}(完成數)`] = element[`topicFinished${Number(i)+1}`]
        }
        this.excelData.push(singleData)
      })
      console.log(this.excelData)
      this.exportExcel(this.excelData)
    })
  }

  exportExcel(excelData:any): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const worksheet = xlsx.utils.json_to_sheet(excelData);
    const workbook = {
      Sheets: {
        'StudentsScores': worksheet
      },
      SheetNames: ['StudentsScores']
    }
    const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE })

    var currentDate = new Date().getMonth()+1+'月'+new Date().getDate()+'日'
    xlsx.writeFile(workbook, `基礎數認知評量與工作記憶測驗結果-${currentDate}.xlsx`);

  }

  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'studentId': return compare(a.studentId, b.studentId, isAsc);
        default: return 0;
      }
    });
  }

  getStudents(): void {
    this.HttpsService.getStudents().subscribe(StudentsData => {
      StudentsData.forEach((element: any) => {
        console.log(element)
        var status = ''
        if (element.status == 0) {
          status = '未登入'
        } else if (element.status == 1) {
          status = '已登入'
        } else if (element.status == 2) {
          status = '作答完成'
        }
        var datas = {
          name: element.name,
          studentId: element.studentId,
          schoolName: element.schoolName,
          grade: element.grade,
          class: element.class,
          status: status,
          accountId: element.accountId
        }
        this.ELE.push(datas)
        this.school.name = datas.schoolName

      });
      this.dataSource = this.ELE
      this.HttpsService.getScores().subscribe(res => {
        res.forEach((element: any) => {
          if (this.studentId.find((elements: any) => element.studentId == elements) == undefined) {
            this.studentId.push(element.studentId)
          }
        });
      })
      this.getSchools()
    })
  }

  getSchools() {
    this.HttpsService.getSchools().subscribe(data => {
      data.forEach((element: any) => {
        if (element.name == this.school.name) {
          this.school.Id = String(element.schoolId)
        } else {
        }
      });
    })
  }

  logout(Id: any) {
    Swal.fire({
      title: '警告！',
      icon: 'warning',
      text: '確定要解鎖嗎？',
      confirmButtonText: '確定',
      showCancelButton: true,
      cancelButtonText: '取消'
    }).then(res => {
      if (res.isConfirmed) {
        var update = [{
          "op": "replace",
          "path": "/Status",
          "value": 0
        },
        {
          "op": "replace",
          "path": "/Token",
          "value": ""
        }]
        this.HttpsService.logouts(Id, update).subscribe(res => {
          Swal.fire({
            title: '成功',
            icon: 'success',
            text: '解鎖成功！',
            confirmButtonText: '好的'
          }).then((res) => {
            location.reload()
          })
        })
      }
    })
  }

  unlockAllStudent() {
    Swal.fire({
      title: '警告！',
      icon: 'warning',
      text: '確定要解鎖嗎？',
      confirmButtonText: '確定',
      showCancelButton: true,
      cancelButtonText: "取消"
    }).then(res => {
      if (res.isConfirmed) {
        this.HttpsService.unlockAllStudent(this.cookieService.get("School")).subscribe(res => {
          Swal.fire({
            title: '成功！',
            icon: 'success',
            text: '解鎖成功！',
            confirmButtonText: '確定'
          }).then(res => {
            location.reload()
          })
        })
      }
    })
  }

  delScore(studentId: any) {
    Swal.fire({
      title: '警告',
      icon: 'warning',
      text: '確定要清除作答嗎？',
      confirmButtonText: '好的',
      cancelButtonText: '取消',
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.HttpsService.delStudentScore(studentId).subscribe(res => {
          Swal.fire({
            title: '成功',
            icon: 'success',
            text: '清除成功！',
            confirmButtonText: '好的'
          }).then((res) => {
            location.reload()
          })
        })
      }
    })
  }

  delStudent(studentId: any) {
    Swal.fire({
      title: '警告',
      icon: 'warning',
      text: '確定要學生資料嗎？',
      confirmButtonText: '好的',
      cancelButtonText: '取消',
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.HttpsService.deleteStudent(studentId).subscribe(res => {
          Swal.fire({
            title: '成功',
            icon: 'success',
            text: '清除成功！',
            confirmButtonText: '好的'
          }).then((res) => {
            location.reload()
          })
        })
      }
    })
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  a = Number(a)
  b = Number(b)
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
