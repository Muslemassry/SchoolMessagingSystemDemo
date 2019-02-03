import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person, Message} from './classes'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SystemServiceService {
  private messagingSystemUrl = 'http://localhost:8081';
  private httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  

  constructor(private http: HttpClient) { }

  // add the services
  getStudents():Observable<Person[]> {
    return this.http.get<Person[]>(`${this.messagingSystemUrl}`+'/students')
      .pipe(tap(_ => this.log('fetched student')), catchError(this.handleError('getStudents', [])));
  };

  getStudentMessages(studentId: number):Observable<Message[]> {
    return this.http.get<Message[]>(`${this.messagingSystemUrl}`+'/studentMessages?studentId='+ `${studentId}`)
      .pipe(tap(_ => this.log('fetched message')), catchError(this.handleError('getStudentMessages', [])));
  };

  getMessage(messageId: number):Observable<Message[]> {
    return this.http.get<Message[]>(`${this.messagingSystemUrl}`+'/message?messageId='+ `${messageId}`)
      .pipe(tap(_ => this.log('fetched message')), catchError(this.handleError('getMessage', [])));
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

  doStudentRegister(newStudent: Person):Observable<any> {
    return this.http.put<Person>(this.messagingSystemUrl+'/student', newStudent, this.httpOptions)
      .pipe(tap((addedStudent: Person) => this.log(`newly registered student w/ username=${addedStudent.username} and id=${addedStudent.id}`)), 
        catchError(this.handleError<Person>('doStudentRegister')));
  }

  doAddNewMessage(newMessage: Message):Observable<any> {
    return this.http.put<Message>(this.messagingSystemUrl+'/message', newMessage, this.httpOptions)
      .pipe(tap((addedMessage: Message) => this.log(`newly added message w/ addedMessageid=${addedMessage.id}`)), 
        catchError(this.handleError<Person>('doAddNewMessage')));
  }

  doReadMessage(readMeassage: Message):Observable<any> {
    return this.http.post<Message>(this.messagingSystemUrl+'/readMessage', readMeassage, this.httpOptions)
      .pipe(tap((updatedMessage: Message) => this.log(`logged in w/ updatedMessageId=${updatedMessage.id}`)), 
        catchError(this.handleError<Person>('doReadMessage')));
  };

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
  };
}
