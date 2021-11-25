import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as  xlsx from 'xlsx'
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  fileName: string = '';
  studentTemp: any;
  studentInfo: any = [];
  result: any;
  data: any = [['編號', '年度', '姓名', '學校', '年班', '性別', '身份別', '都市化程度']]
  filetype: any
  constructor(private HttpsService: HttpsService) { }
  arrayBuffer: any
  ngOnInit(): void {
  }
  changeListener(event: any) {
    if (event.target.files[0].name.split('.')[1] == 'xlsx') {
      this.filetype = 'xlsx'
      var files: File = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = xlsx.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        //console.log(xlsx.utils.sheet_to_json(worksheet, { raw: true }));
        this.result = xlsx.utils.sheet_to_json(worksheet, { raw: true })
        console.log(this.result)
      }
      fileReader.readAsArrayBuffer(files);
    } else {
      this.filetype = 'csv'
      var files: File = event.target.files[0];
      if (files) {
        let reader: FileReader = new FileReader();
        reader.readAsText(files);
        reader.onload = (e) => {
          let csv: any = reader.result;
          this.studentTemp = csv.split(',')
          console.log(this.studentTemp)
          if (this.studentTemp[0] == '學號') {
            this.studentTemp.splice(0, 3)
            this.studentTemp[0] = this.studentTemp[0].split('\r\n')[1]
          }
          this.studentTemp.forEach((element: any) => {
            if (element.split('\r\n').length > 1) {
              this.studentInfo.push(element.split('\r\n')[0])
              if (element.split('\r\n')[1] != '') {
                this.studentInfo.push(element.split('\r\n')[1])
              }
            } else {
              this.studentInfo.push(element)
            }
          });
        }
      }
    }
  }
  daochu() {
    const ws: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(this.data);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, '範例檔案.xlsx');
  }
  sendScore() {
    if (this.filetype == 'xlsx') {
      var schoolList: any = []
      this.HttpsService.getSchools().subscribe(res => {
        this.result.forEach((element: any) => {
          if (schoolList.length == 0) {
            schoolList.push(element.學校)
          }
          for (var i = 0; i < schoolList.length; i++) {
            if (schoolList[i] == element.學校) {
              break
            } else if (schoolList[i] != element.學校) {
              if (i == schoolList.length - 1) {
                schoolList.push(element.學校)
              }
            }
          }
        });
        schoolList.forEach((elements: any) => {
          if (res.find((element: any) => elements == element.name) == undefined) {
            var school = {
              name: elements
            }
            this.HttpsService.uploadSchool(school).subscribe()
          }
        });
        var students: any = []
        this.result.forEach((element: any) => {
          var gender = true
          var Identity = 1
          var classes: any = element.年班.toString()
          var year: any = ''
          var schoolId: any
          if (element.身份別 == '特殊生') {
            Identity = 2
          }
          if (element.性別 == 2) {
            gender = false
          }
          year = classes.slice(0, 1)
          res.forEach((elements: any) => {
            if (element.學校 == elements.name) {
              schoolId = elements.schoolId
            }
          });
          var student: any = {
            studentId: element.編號.toString(),
            schoolId: schoolId,
            name: element.姓名,
            class: classes.toString(),
            grade: year,
            gender: gender,
            stuIdentity: Identity,
            year: element.年度,
            urbanization: element.都市化程度
          }
          students.push(student)
        });
        this.HttpsService.uploadProjectRequest(students).subscribe(
          value => this.success(value),
          error => this.error(error))
      })
    } else {
      var count = this.studentInfo.length / 4
      var sendInfo = []
      for (var i = 0; i < count; i++) {
        var gender = true
        if (this.studentInfo[3 + 4 * i] == '女') {
          gender = false
        }
        var Info = {
          studentId: this.studentInfo[0 + 4 * i], schoolId: 1,
          name: this.studentInfo[1 + 4 * i], class: this.studentInfo[2 + 4 * i],
          gender: gender
        }
        sendInfo.push(Info)
      }
      if (sendInfo.length >= 1) {
        this.HttpsService.uploadProjectRequest(sendInfo).subscribe(res => {
          if (res.status == 200 && res.body == true) {
            Swal.fire({
              title: '成功',
              icon: 'success',
              text: '新增成功！即將返回主頁面',
              confirmButtonText: '好的'
            }).then((result) => {
              location.href = '/main'
            })
          } else {
            Swal.fire({
              title: '錯誤',
              icon: 'error',
              text: '新增失敗！請檢查學號是否重複！',
              confirmButtonText: '好的'
            })
          }
        }, err => {
          if (err.status == 500) {
            Swal.fire({
              title: '錯誤',
              icon: 'error',
              text: '新增失敗！請檢查帳號是否重複！',
              confirmButtonText: '好的'
            })
          }
        })
      } else {
        Swal.fire({
          title: '錯誤',
          icon: 'error',
          text: '未選擇檔案！',
          confirmButtonText: '好的'
        })
      }
    }
  }
  /** API呼叫成功的處理 */
  success(value: any) {
  }

  /** API呼叫失敗的錯誤處理 */
  error(error: HttpErrorResponse) {
    if (error.error.text.split(":")[0] == '學號') {
      Swal.fire({
        title: '錯誤',
        icon: 'error',
        text: '學號' + error.error.text.split(" ")[0].split(':')[1] + '重複！',
        confirmButtonText: '好的'
      })
    } else if (error.error.text == '已完成學生新增作業') {
      Swal.fire({
        title: '成功',
        icon: 'success',
        text: '已完成學生新增作業',
        confirmButtonText: '好的'
      }).then(res => {
        location.href = '/StudentInfo'
      })
    } else {
      Swal.fire({
        title: '錯誤',
        icon: 'error',
        text: '檔案格式錯誤，請檢查。',
        confirmButtonText: '好的'
      })
    }
  }
}
