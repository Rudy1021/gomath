import { Component, OnInit } from '@angular/core';
import { HttpsService } from './../../services/https.service';
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  constructor(private HttpsService: HttpsService) { }

  ngOnInit(): void {
    this.getTopic();
  }
  getTopic() {
    this.HttpsService.getTopic().subscribe(data => {
      console.log(data)
    })
  }
}
