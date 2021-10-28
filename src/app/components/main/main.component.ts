import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpsService } from './../../services/https.service';
import * as  xlsx from 'xlsx'
@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private HttpsService: HttpsService,) { }
  data: any = []
  ngOnInit(): void {
  }
  output() {
    this.HttpsService.getScores().subscribe(StudentsData => {
      StudentsData.forEach((element: any) => {
        var tempdata = []
        tempdata.push(element.name)
        tempdata.push(element.studentId)
        tempdata.push(element.topic)
        tempdata.push(element.answerSpeedSecond)
        this.data.push(tempdata)
      });
      const ws: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(this.data);
      /* generate workbook and add the worksheet */
      const wb: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      /* save to file */
      xlsx.writeFile(wb, '總學生成績.csv');
    })

  }

  /*
      Swal.fire({
      title: '成功',
      icon: 'success',
      text: '匯出成功！',
      confirmButtonText: '好的'
    })
  */
}
