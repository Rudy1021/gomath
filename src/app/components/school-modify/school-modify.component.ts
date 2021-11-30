import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from './../../services/https.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-school-modify',
  templateUrl: './school-modify.component.html',
  styleUrls: ['./school-modify.component.scss']
})
export class SchoolModifyComponent implements OnInit {
  title: any
  name: any
  option: any
  placeholder: any = ''
  constructor(private route: ActivatedRoute, private HttpsService: HttpsService) { }

  ngOnInit(): void {
    this.init()
  }
  init() {
    if (this.route.snapshot.paramMap.get('option')! == 'new') {
      this.title = "新增學校"
      this.option = "新增"
      this.placeholder = "請輸入學校名稱"
    } else {
      this.title = "修改學校"
      this.option = "修改"
      this.getSchool()
    }
  }

  getSchool() {
    this.HttpsService.getSchools().subscribe(data => {
      data.forEach((element: any) => {
        if (element.schoolId == this.route.snapshot.paramMap.get('option')!) {
          this.name = element.name
        }
      });
    })
  }

  submit() {
    if (this.option == '新增') {
      var data = {
        name: this.name
      }
      this.HttpsService.uploadSchool(data).subscribe(data => {
        Swal.fire({
          title: '成功！',
          icon: 'success',
          text: '建立成功！',
          confirmButtonText: '好的'
        }).then(res => {
          location.href = '/schoolList'
        })
      })
    } else {
      var datas = [
        { "op": "replace", "path": "/Name", "value": this.name }
      ]
      this.HttpsService.PatchSchool(this.route.snapshot.paramMap.get('option')!, datas).subscribe(data => {
        Swal.fire({
          title: '成功！',
          icon: 'success',
          text: '修改成功！',
          confirmButtonText: '好的'
        }).then(res => {
          location.href = '/schoolList'
        })
      })
    }
  }
}
