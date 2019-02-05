import { Component, OnInit } from '@angular/core';
import {SystemServiceService} from '../system-service.service';
import {Person} from '../classes';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  systemStudents: Person[];
  constructor(private systemServiceService: SystemServiceService) { }

  ngOnInit() {
  }

  getStudents() {
    this.systemServiceService.getStudents
  }

}
