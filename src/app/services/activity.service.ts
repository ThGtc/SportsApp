import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../models/activity.model";

const baseUrl = 'http://localhost:8080/api/activities';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Activity[]>{
    return this.http.get<Activity[]>(baseUrl);
  }

  get(id: any): Observable<Activity>{
    return this.http.get<Activity>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any>{
    return this.http.post(baseUrl, data,httpOptions);
  }

  update(id: any, data: any): Observable<any>{
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any>{
    return this.http.delete(baseUrl);
  }

//Les 'findBy...', que l'on enrichira d'autres modes de recherche + tard
  findByTitle(title: any): Observable<Activity[]>{
    return this.http.get<Activity[]>(`${baseUrl}?title=${title}`);
  }

}
