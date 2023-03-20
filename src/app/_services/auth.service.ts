import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sports} from "../models/sports.model";

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(pseudo: string | undefined, password: string | undefined): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        pseudo,
        password,
      },
      httpOptions
    );
  }

  register(pseudo: string | undefined, firstName: string | undefined, lastName: string | undefined, mail: string | undefined, password: string | undefined, birthDate: Date | undefined, favoriteSport: Sports | undefined): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        pseudo,
        firstName,
        lastName,
        mail,
        password,
        birthDate,
        favoriteSport
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }
}
