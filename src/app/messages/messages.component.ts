import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system-service.service';
import { Message } from '../classes';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  currentMessages : Message[];
  private studentId : number;
  constructor(private theSystemService : SystemService) {
    this.studentId = 3;
   }

  ngOnInit() {
    this.getStudentMessages();
  }

  getStudentMessages() : void {
    this.theSystemService.getStudentMessages(this.studentId).subscribe(messages => this.currentMessages = messages);
  }
}
