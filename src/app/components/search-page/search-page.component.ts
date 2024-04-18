import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from './../../services/https.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CookieService } from 'ngx-cookie-service';
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
  userAns: any = []
  changeDisabled: any = []
  recognize = false
  displayedColumns: any = ['題目', 'right', 'student', 'fix', 'image']
  constructor(private route: ActivatedRoute,
    private HttpsService: HttpsService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getStudent()
  }
  getStudent() {
    var ans = ''
    this.HttpsService.getSearchStudent("student_id=" + this.route.snapshot.paramMap.get('id')!).subscribe((res: any) => {
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
        } else if (element.answer == 'AI主機連線失敗') {
          this.recognize = true
        }
        if (element.topicAnswer == element.answer) {
          judge.push('對')
          this.changeDisabled.push(true)
        } else {
          judge.push('錯')
          this.changeDisabled.push(false)
        }
        var datas = {
          wrong: element.topic,
          correct: element.topicAnswer,
          write: element.answer,
          picture: element.image,
          feedbackId: element.feedbackId
        }
        this.userAns.push(element.answer)
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
      this.answer[i] = this.correctAns[i]
      this.userAns[i] = this.correctAns[i]
      this.HttpsService.updateFeedback(sub, this.feedbackId[i]).subscribe((res: any) => {
      })
    }
  }
  delStudentScore() {
    var accountId = ''
    Swal.fire({
      title: '警告！',
      icon: 'warning',
      text: '確定要刪除嗎？',
      confirmButtonText: '確定',
      showCancelButton: true,
      cancelButtonText: "取消"
    }).then(res => {
      if (res.isConfirmed) {
        this.HttpsService.getStudents().subscribe(res => {
          res.forEach((element: any) => {
            if (element.studentId == this.route.snapshot.paramMap.get('id')!) {
              accountId = element.accountId
            }
          });
          this.HttpsService.delStudentScore(accountId).subscribe(res => {
            Swal.fire({
              title: '成功！',
              icon: 'success',
              text: '刪除成功！',
              confirmButtonText: '確定'
            }).then(res => {
              location.href = '/ansPage'
            })
          })
        })
      }
    })
  }
  ReRecognize() {
    this.HttpsService.ReRecognize().subscribe(res => {
      if (res == true) {
        Swal.fire({
          title: '成功！',
          icon: 'success',
          text: '辨識成功！',
          confirmButtonText: '確定'
        }).then(res => {
          location.reload()
        })
      }
    })
  }
}
