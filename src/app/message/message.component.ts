import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  currentId : string;
  username : string;
  messageId :string;
  currentMessage : string;

  constructor(private systemService : SystemService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.currentId = this.route.snapshot.paramMap.get('id');
    console.log('currentId' + `${this.currentId}`);
    this.username = this.route.snapshot.paramMap.get('username');
    console.log('username' + `${this.username}`);
    this.messageId = this.route.snapshot.paramMap.get('messageId');
    console.log('messageId' + `${this.messageId}`);
    this.getStudentMessages();
  }

  getStudentMessages() : void {
    this.systemService.getMessage(`${this.messageId}`).subscribe(fetchedMsg => this.currentMessage = fetchedMsg.messageContent);
  }

}
