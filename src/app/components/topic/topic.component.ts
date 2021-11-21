import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  group: any = []
  groupTopic: any
  groupName = ''
  Time = ''
  t = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
  a = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  constructor(private HttpsService: HttpsService) { }

  ngOnInit(): void {
    this.getGroup();
  }
  getTopic() {
    this.HttpsService.getTopicName().subscribe(data => {
      data.forEach((element: any) => {
      });

    })
  }
  getGroup() {
    this.HttpsService.getGroup().subscribe(data => {
      console.log(data)
      this.group = data
      this.groupTopic = this.group[0].questionTypeId.split(',')
      this.groupTopic.forEach((element: any) => {
        this.a[element - 1] = true
      });
      this.groupName = this.group[0].topicSettingsId
      this.Time = this.group[0].breakTime
    })
  }

  changeGroup(Value: any) {
    this.a = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    this.groupName = this.group[Value.slice(-1) - 1].topicSettingsId
    this.Time = this.group[Value.slice(-1) - 1].breakTime
    this.groupTopic = this.group[Value.slice(-1) - 1].questionTypeId.split(',')
    this.groupTopic.forEach((element: any) => {
      this.a[element - 1] = true
    });

  }
  send() {
    console.log(this.a)
    var topic: any = []
    var num = this.groupName
    console.log(num)
    var update = ''
    this.a.forEach((element: any, index: number) => {
      if (element == true) {
        topic.push(index + 1)
      }
    });
    topic.forEach((element: any) => {
      update = update + element + ','
    });
    update = update.slice(0, -1)
    var Data = [{
      "path": "/questionTypeId",
      "op": "replace",
      "value": update
    },
    { "op": "replace", "path": "/BreakTime", "value": parseInt(this.Time) }]
    console.log(Data)
    this.HttpsService.updateGroup(num, Data).subscribe(res => {
      Swal.fire({
        title: '成功！',
        icon: 'success',
        text: '修改成功！',
        confirmButtonText: '好的'
      }).then(res => {
        location.reload()
      })
    })
  }
}
