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
      .pipe(tap((returnedAdmin: Person) => this.log(`logged in w/ username=${returnedAdmin.username}`)), 
        catchError(this.handleError<Person>('doAdminLogin')));
  };

  doStudentLogin(student: Person):Observable<any> {
    return this.http.post<Person>(this.messagingSystemUrl+'/student', student, this.httpOptions)
      .pipe(tap((returnedStudent: Person) => this.log(`logged in w/ username=${returnedStudent.username}`)), 
        catchError(this.handleError<Person>('doStudentLogin')));
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
