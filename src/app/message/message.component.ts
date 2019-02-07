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
  constructor(private systemService : SystemService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.username = this.route.snapshot.paramMap.get('username');
  }

}
