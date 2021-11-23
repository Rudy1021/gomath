import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from './../../services/https.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
export interface a {
  wrong: string;
  correct: any;
  write: any;
  picture: any;
}
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  image: any = 'data:image/png;base64,'
  dataSource: any = [];
  change: any = ''
  changeArray: any = []
  ELE: a[] = []
  feedbackId: any = [];
  answer: any = []
  correctAns: any = []
  displayedColumns: any = ['錯的題目', '正解', '題目辨識手寫結果', '下拉式選單修正對錯', '題目手寫圖片']
  constructor(private route: ActivatedRoute,
    private HttpsService: HttpsService) { }

  ngOnInit(): void {
    this.getStudent()
  }
  getStudent() {
    var ans = ''
    this.HttpsService.getSearch("student_id=" + this.route.snapshot.paramMap.get('id')!).subscribe((res: any) => {
      var judge: any = []
      var n = res.length
      for (let i = 0; i < n - 1; i++) {
        // 3
        for (let j = 0; j < n - 1 - i; j++) {
          // 4
          if (res[j].createdTime > res[j + 1].createdTime) {
            // 5
            const temp = res[j];
            res[j] = res[j + 1];
            res[j + 1] = temp;
          }
        }
      }
      res.forEach((element: any) => {
        this.feedbackId.push(element.feedbackId)
        this.answer.push(element.answer)
        this.correctAns.push(element.topicAnswer)
        if (element.answer == '' || element.answer == null) {
          element.answer = '無作答'
        }
        if (element.topicAnswer == element.answer) {
          judge.push('對')
        } else {
          judge.push('錯')
        }
        var datas = {
          wrong: element.topic,
          correct: element.topicAnswer,
          write: element.answer,
          picture: element.image
        }
        this.ELE.push(datas)
      });
      this.dataSource = this.ELE
      this.changeArray.length = this.dataSource.length
      for (var i = 0; i < this.changeArray.length; i++) {
        this.changeArray[i] = judge[i]
      }
    })
  }
  submit(i: number) {
    if (this.changeArray[i] == '對' && this.answer[i] != this.correctAns[i]) {
      var sub = [{
        "path": "/answer",
        "op": "replace",
        "value": this.correctAns[i]
      }]
      this.HttpsService.updateFeedback(sub, this.feedbackId[i]).subscribe((res: any) => {
      })
    }
  }
}
