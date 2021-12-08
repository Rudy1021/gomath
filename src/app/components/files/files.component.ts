import { HttpsService } from './../../services/https.service';
import { Component, HostListener, OnInit } from '@angular/core';
@Component({
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  StudentsData: any;
  none: boolean = true;
  correct = '對'
  filters1: any = ['無', '作答時間', '性別', '作答結果', '學生學號', '作答大題'];
  filters2: any = [];
  filters3: any = ['男', '女']
  filters4: any = ['對', '錯']
  tip1 = '請選擇選項'
  tip2 = ''
  no: boolean = true;
  one = '無'
  two = ''
  oneAns = ''
  twoAns = ''
  gen = '男'
  gend1 = '男'
  gend2 = '男'
  topic1: any = []
  topic2: any = []
  topic: any = []
  topics1 = '圖形辨識計數'
  topics2 = '圖形辨識計數'

  constructor(
    private HttpsService: HttpsService
  ) { }
  ngOnInit(): void {
    this.getScores();
    this.getTopicName();
    this.one = '無'
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
      this.tip1 = '請選擇選項'
    } else {
      this.two = '無'
      this.tip2 = '請選擇選項'
      this.filters2 = ['無', '作答時間', '性別', '作答結果', '學生學號', '作答大題'];
      var option1 = this.filters1.indexOf(Value)
      this.filters2.splice(option1, 1);
      this.none = false
    }
    if (Value == '作答結果') {
      this.tip1 = '請輸入數量'
    } else if (Value == '學生學號') {
      this.tip1 = '請輸入學號'
    } else if (Value == '作答時間') {
      this.tip1 = '請輸入作答秒數'
    }
  }
  non(Value: any): void {
    if (Value == '無') {
      this.twoAns = ''
      this.no = true
      this.tip2 = '請選擇選項'
    } else {
      this.twoAns = ''
      this.no = false
    }
    if (Value == '作答結果') {
      this.tip2 = '請輸入數量'
    } else if (Value == '學生學號') {
      this.tip2 = '請輸入學號'
    } else if (Value == '作答時間') {
      this.tip2 = '請輸入作答秒數'
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
    var c = true
    if (this.correct != '對') {
      c = false
    }
    if (this.one == '無') {
      location.href = '/analyze/none'
    } else if (this.one == '作答時間') {
      this.one = '無'
      if (this.two == '無') {
        location.href = '/analyze/a' + this.oneAns
      } else if (this.two == '性別') {
        location.href = '/analyze/a' + this.oneAns + 'andg' + g
      } else if (this.two == '作答結果') {
        location.href = '/analyze/a' + this.oneAns + 'andc' + c
      } else if (this.two == '學生學號') {
        location.href = '/analyze/a' + this.oneAns + 'andI' + this.twoAns
      } else if (this.two == '作答大題') {
        location.href = '/analyze/a' + this.oneAns + 'ands' + s
      }
    } else if (this.one == '性別') {
      this.one = '無'
      if (this.two == '無') {
        location.href = '/analyze/g' + g
      } else if (this.two == '作答時間') {
        location.href = '/analyze/a' + this.twoAns + 'andg' + g
      } else if (this.two == '作答結果') {
        location.href = '/analyze/g' + g + 'andc' + c
      } else if (this.two == '學生學號') {
        location.href = '/analyze/g' + g + 'angI' + this.twoAns
      } else if (this.two == '作答大題') {
        location.href = '/analyze/s' + s + 'andg' + g
      }
    } else if (this.one == '作答結果') {
      this.one = '無'
      if (this.two == '無') {
        location.href = '/analyze/c' + c
      } else if (this.two == '性別') {
        location.href = '/analyze/g' + g + 'andc' + c
      } else if (this.two == '作答時間') {
        location.href = '/analyze/a' + this.twoAns + 'andc' + c
      } else if (this.two == '學生學號') {
        location.href = '/analyze/c' + c + 'andI' + this.twoAns
      } else if (this.two == '作答大題') {
        location.href = '/analyze/s' + s + 'andc' + c
      }
    } else if (this.one == '學生學號') {
      this.one = '無'
      if (this.two == '無') {
        location.href = '/analyze/I' + this.oneAns
      } else if (this.two == '性別') {
        location.href = '/analyze/g' + g + 'andI' + this.oneAns
      } else if (this.two == '作答結果') {
        location.href = '/analyze/I' + this.oneAns + 'andc' + c
      } else if (this.two == '作答時間') {
        location.href = '/analyze/a' + this.twoAns + 'andI' + this.oneAns
      } else if (this.two == '作答大題') {
        location.href = '/analyze/I' + this.twoAns + 'ands' + s
      }
    } else if (this.one == '作答大題') {
      this.one = '無'
      if (this.two == '無') {
        location.href = '/analyze/s' + s
      } else if (this.two == '性別') {
        location.href = '/analyze/g' + g + 'ands' + s
      } else if (this.two == '作答結果') {
        location.href = '/analyze/s' + s + 'andc' + c
      } else if (this.two == '學生學號') {
        location.href = '/analyze/s' + s + 'andI' + this.twoAns
      } else if (this.two == '作答時間') {
        location.href = '/analyze/s' + this.oneAns + 'anda' + this.twoAns
      }
    }
  }
}
