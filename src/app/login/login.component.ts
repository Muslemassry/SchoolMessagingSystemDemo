import { Component, OnInit } from '@angular/core';
import { Person } from '../classes';
import { SystemService } from '../system-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  person : Person;
  constructor(private systemService : SystemService) { }

  ngOnInit() {
    this.person = new Person();
  }

  doAdminLogin() : void {
    this.systemService.doAdminLogin(this.person).subscribe()
  }

  doStudentLogin() : void {
    this.systemService.doStudentLogin(this.person).subscribe()
  }

  private operateReturnedValue(returnedValue : any) : void {
    if (returnedValue.auth && returnedValue.auth == true) {
      // add to the root scope isAdmin
      // add to the root scope username; 
    } else {
      alert('Failed To loging'); 
    }
  }

}
