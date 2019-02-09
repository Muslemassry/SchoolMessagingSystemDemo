import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person, Message} from './classes'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SystemService {
  private messagingSystemUrl = 'http://localhost:8083';
  private httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  
  

  constructor(private http: HttpClient) { }

  // add the services
  getStudents():Observable<Person[]> {
    console.log(`${this.messagingSystemUrl}`+'/students');
    return this.http.get<Person[]>(`${this.messagingSystemUrl}`+'/students')
      .pipe(tap(_ => this.log('fetched student')), catchError(this.handleError('getStudents', [])));
  };

  getStudentMessages():Observable<Message[]> {
    return this.http.get<Message[]>(`${this.messagingSystemUrl}`+'/studentMessages', this.httpOptions)
      .pipe(tap(_ => this.log('fetched message')), catchError(this.handleError('getStudentMessages', [])));
  };

  getMessage(messageId: string):Observable<Message> {
    return this.http.get<Message>(`${this.messagingSystemUrl}`+'/message?messageId='+ `${messageId}`)
      .pipe(tap((msg: Message) => this.log('fetched message')), catchError(this.handleError<Message>('getMessage')));
  };

  doAdminLogin(admin: Person):Observable<any> {
    return this.http.post<Person>(this.messagingSystemUrl+'/admin', admin, this.httpOptions)
      .pipe(tap((returnedValue: any) => this.updateHttpOptionsForLogin(returnedValue)), 
        catchError(this.handleError<Person>('doAdminLogin')));
  };

  private updateHttpOptionsForLogin(returnedValue : any) : void {
    if(returnedValue.auth == true) {
      this.httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token' :  returnedValue.token})};
    } else {
      alert('Failed To loging'); 
    }
  };

  doStudentLogin(student: Person):Observable<any> {
    return this.http.post<Person>(this.messagingSystemUrl+'/student', student, this.httpOptions)
      .pipe(tap((returnedValue: any) => this.updateHttpOptionsForLogin(returnedValue)), 
        catchError(this.handleError<Person>('doStudentLogin')));
  };

  doLogout():Observable<any> {
    return this.http.get<any>(`${this.messagingSystemUrl}`+'/logout')
      .pipe(tap((returnedValue: any) => this.updateHttpOptionsForLogout(returnedValue)), catchError(this.handleError<Message>('getMessage')));
  };

  private updateHttpOptionsForLogout(returnedValue : any) : void {
    if(returnedValue.auth == false) {
      this.httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
      // remove the root scope isAdmin
      // remove the root scope username;
    } else {
      alert('Failed To logout'); 
    }
  };

  doStudentRegister(newStudent: Person):Observable<Person> {
    console.log(newStudent);
    return this.http.put<Person>(this.messagingSystemUrl+'/student', newStudent, this.httpOptions)
      .pipe(tap((addedStudent: Person) => this.log(`newly registered student w/ username=${addedStudent.username} and id=${addedStudent.id}`)), 
        catchError(this.handleError<Person>('doStudentRegister')));
  }

  doAddNewMessage(newMessage: Message):Observable<any> {
    return this.http.put<Message>(this.messagingSystemUrl+'/message', newMessage, this.httpOptions)
      .pipe(tap((addedMessage: Message) => this.log('newly added message')), 
        catchError(this.handleError<Person>('doAddNewMessage')));
  }

  doReadMessage(readMeassage: Message):Observable<any> {
    return this.http.post<Message>(this.messagingSystemUrl+'/readMessage', readMeassage, this.httpOptions)
      .pipe(tap((updatedMessage: Message) => this.log(`logged in w/ updatedMessageId=${updatedMessage.id}`)), 
        catchError(this.handleError<Person>('doReadMessage')));
  };

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
  };
}
