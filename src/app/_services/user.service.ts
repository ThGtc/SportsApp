import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user.model";

const baseUrl = 'http://localhost:8080/api/users';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUser(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  updateUser(id: any, data: any): Observable<User> {
    return this.http.put(`${baseUrl}/${id}`, data)
  }
}
