import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  a = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  year = ['1年級', '2年級', '3年級', '4年級', '5年級', '6年級']
  input = '1年級'
  constructor(private HttpsService: HttpsService) { }

  ngOnInit(): void {
  }
  create() {
    var topic: any = []
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
    var grade = this.input.slice(0, 1)
    var data = {
      schoolId: 1,
      grade: parseInt(grade),
      questionTypeId: update
    }
    console.log(data)
    this.HttpsService.uploadGroup(data).subscribe(res => {
      Swal.fire({
        title: '成功！',
        icon: 'success',
        text: '建立成功！',
        confirmButtonText: '好的'
      }).then(res => {
        location.href = '/topic'
      })
    })
  }
}
