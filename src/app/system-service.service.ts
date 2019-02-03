import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student, Message} from './classes'

@Injectable({
  providedIn: 'root'
})
export class SystemServiceService {
  private messagingSystemUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  // add the services
  getStudents():Observable<Student[]> {
    // to be edited
    return this.http.get<Student[]>(this.messagingSystemUrl+'/students')
      .pipe(tap(_ => this.log('fetched student')), catchError(this.handleError('getStudents', [])));
  }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
