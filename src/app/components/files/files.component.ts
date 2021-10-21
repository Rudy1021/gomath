import { HttpsService } from './../../services/https.service';
import { Component, OnInit } from '@angular/core';
@Component({
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  StudentsData: any;
  none: boolean = true;
  filters1: any = ['無', '作答時間', '性別', '作答結果', '學生學號', '作答大題'];
  filters2: any = [];
  filters3: any = ['男', '女']
  no: boolean = true;
  one = '無'
  two = ''
  oneAns = ''
  twoAns = ''
  gen = '男'
  gend1 = ''
  gend2 = ''
  topic1: any = []
  topic2: any = []
  topic: any = []
  topics1 = ''
  topics2 = ''
  constructor(
    private HttpsService: HttpsService
  ) { }

  ngOnInit(): void {
    this.getScores();
    this.getTopicName();
  }
  getScores(): void {
    this.HttpsService.getScores().subscribe(StudentsData => {
    })
  }
  getTopicName() {
    this.HttpsService.getTopicName().subscribe(Data => {
      this.topic = Data
      Data.forEach((element: any) => {
        this.topic1.push(element.name)
        this.topic2.push(element.name)
      });
    })
  }
  changeName(Value: any): void {
    this.oneAns = ''
    if (Value == '無') {
      this.filters2 = [];
      this.none = true
    } else {
      this.two = '無'
      this.filters2 = ['無', '作答時間', '性別', '作答結果', '學生學號', '作答大題'];
      var option1 = this.filters1.indexOf(Value)
      this.filters2.splice(option1, 1);
      this.none = false
    }
  }
  non(Value: any): void {
    if (Value == '無') {
      this.twoAns = ''
      this.no = true
    } else {
      this.twoAns = ''
      this.no = false
    }
  }

  search() {
    var s
    if (this.one == '作答大題') {
      this.topic.forEach((element: any) => {
        if (this.topics1 == element.name) {
          s = element.questionTypeId
        }
      });
    } else if (this.two == '作答大題') {
      this.topic.forEach((element: any) => {
        if (this.topics2 == element.name) {
          s = element.questionTypeId
        }
      });
    }
    console.log(s)
    var g = true
    if (this.gend1 == '男' && this.oneAns == '') {
      g = true
    } else if (this.gend1 == '女' && this.oneAns == '') {
      g = false
    } else if (this.gend2 == '男' && this.twoAns == '') {
      g = true
    } else {
      g = false
    }
    if (this.one == '無') {
      location.href = '/analyze/none'
    } else if (this.one == '作答時間') {
      if (this.two == '無') {
        location.href = '/analyze/a' + this.oneAns
      } else if (this.two == '性別') {
        location.href = '/analyze/a' + this.oneAns + 'andg' + g
      } else if (this.two == '作答結果') {//
        location.href = '/analyze/a' + this.oneAns + 'ands' + this.twoAns
      } else if (this.two == '學生學號') {
        location.href = '/analyze/a' + this.oneAns + 'andI' + this.twoAns
      } else if (this.two == '作答大題') {
        location.href = '/analyze/a' + this.oneAns + 'ands' + s
      }
    } else if (this.one == '性別') {
      if (this.two == '無') {
        location.href = '/analyze/g' + g
      } else if (this.two == '作答時間') {
        location.href = '/analyze/a' + this.twoAns + 'andg' + g
      } else if (this.two == '作答結果') {//
        location.href = '/analyze/g' + g + 'ands' + this.twoAns
      } else if (this.two == '學生學號') {
        location.href = '/analyze/g' + g + 'angI' + this.twoAns
      } else if (this.two == '作答大題') {
        location.href = '/analyze/s' + s + 'andg' + g
      }
    } else if (this.one == '作答結果') { //
      if (this.two == '無') {
        location.href = '/analyze/startTime=' + this.oneAns + '&EndTime=' + this.oneAns
      } else if (this.two == '性別') {
        location.href = '/analyze/g' + g + '&Gender=' + g
      } else if (this.two == '作答時間') {
        location.href = '/analyze/startTime=' + this.twoAns + '&EndTime=' + this.twoAns
      } else if (this.two == '學生學號') {
        location.href = '/analyze/startTime=' + this.oneAns + '&EndTime=' + this.oneAns + '&studentId=' + this.twoAns
      } else if (this.two == '作答大題') {
        location.href = '/analyze/startTime=' + this.oneAns + '&EndTime=' + this.oneAns
      }
    } else if (this.one == '學生學號') {
      if (this.two == '無') {
        location.href = '/analyze/I' + this.oneAns
      } else if (this.two == '性別') {
        location.href = '/analyze/g' + g + 'andI' + this.oneAns
      } else if (this.two == '作答結果') { //
        location.href = '/analyze/startTime=' + this.oneAns + '&EndTime=' + this.oneAns
      } else if (this.two == '作答時間') {
        location.href = '/analyze/a' + this.twoAns + 'andI' + this.oneAns
      } else if (this.two == '作答大題') {
        location.href = '/analyze/s' + this.twoAns + 'ands' + s
      }
    } else if (this.one == '作答大題') {
      if (this.two == '無') {
        location.href = '/analyze/s' + s
      } else if (this.two == '性別') {
        location.href = '/analyze/g' + g + 'ands' + s
      } else if (this.two == '作答結果') { //
        location.href = '/analyze/startTime=' + this.oneAns + '&EndTime=' + this.oneAns
      } else if (this.two == '學生學號') {
        location.href = '/analyze/s' + s + 'andI' + this.twoAns
      } else if (this.two == '作答時間') {
        location.href = '/analyze/s' + this.oneAns + 'anda' + this.twoAns
      }
    }
  }
}
