import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    api:string = "http://localhost:8083/notification/api/notifications";
    http:HttpClient = inject(HttpClient); 

  constructor() { }

    getNotifications(): Observable<string[]>{
      return this.http.get<string[]>(`${this.api}`,
        {
          headers: new HttpHeaders({
            'userId': localStorage.getItem('userId') ?? "",
            'userRole': localStorage.getItem('userRole') ?? ""
          })
        }
      );
    }
}
