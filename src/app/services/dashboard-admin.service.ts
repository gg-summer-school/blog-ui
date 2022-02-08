import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Articles } from '../model/articles';
import { Categories } from '../model/categories';
import {catchError, tap, map} from 'rxjs/operators';
import { Users } from '../model/users';


@Injectable({
  providedIn: 'root'
})
export class DashboardAdminService {
  // baseUrl2: string = environment.baseUrl2;
  // httpHeader = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  // constructor(private http: HttpClient) { }
  // getAllUsers()
  // {
  //   return this.http.get(this.baseUrl2 + '/' + 'users');
  //
  // }
  // getOneUser(user_id: Users): Observable<Users[]>{
  //   return this.http.get<Users[]>(this.baseUrl2 + '/' + 'users' + '/' + { user_id })
  //     .pipe(
  //       tap(_ => console.log(`User fetched: ${user_id}`))
  //     );
  // }
  //
  // // getUserArticles(): Observable<Articles[]> {
  //   // return this.http.put<Articles[]>(this.baseUrl2 + '/' + 'articles' + '/' + 'users' + '/' + user_id)
  // // }
  // //
  // // getStudent(id): Observable<Student[]> {
  //   // return this.http.get<Student[]>('api-goes-here/' + id)
  //     // .pipe(
  //       // tap(_ => console.log(`Student fetched: ${id}`)),
  //       // catchError(this.handleError<Student[]>(`Get student id=${id}`))
  //     // );
  // // }
  // //
  // // getStudentList(): Observable<Student[]> {
  //   // return this.http.get<Student[]>('api-goes-here/')
  //     // .pipe(
  //       // tap(Student => console.log('Student fetched!')),
  //       // catchError(this.handleError<Student[]>('Get student', []))
  //     // );
  // // }
}

