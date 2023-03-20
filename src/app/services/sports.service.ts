import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sports} from "../models/sports.model";

const baseUrl = 'http://localhost:8080/api/sports';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  constructor(private http: HttpClient) { }

  getSports(): Observable<Sports[]>{
    return this.http.get<Sports[]>(baseUrl);
  }

}
