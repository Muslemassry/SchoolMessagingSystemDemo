import { Component, OnInit } from '@angular/core';
import {SystemService} from '../system-service.service';
import {Person} from '../classes';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  systemStudents: Person[];
  constructor(private systemServiceService: SystemService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents() : void {
    this.systemServiceService.getStudents().subscribe(students => this.systemStudents = students);
  }
}
