import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system-service.service';
import { ActivatedRoute } from '@angular/router';

import { Message } from '../classes';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  currentMessages : Message[];
  private studentId : string;
  constructor(private theSystemService : SystemService, private route : ActivatedRoute) {
    this.studentId = this.route.snapshot.paramMap.get('studentId');
   }

  ngOnInit() {
    this.getStudentMessages();
  }

  getStudentMessages() : void {
    this.theSystemService.getStudentMessages(this.studentId).subscribe(messages => this.currentMessages = messages);
  }
}
