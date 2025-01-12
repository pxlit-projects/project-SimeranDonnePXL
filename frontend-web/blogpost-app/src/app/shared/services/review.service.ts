import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { RejectPostRequest } from '../models/RejectPostRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  api:string = "http://localhost:8083/review/api/reviews";
  http:HttpClient = inject(HttpClient); 

  constructor() { }

  postRejectRequest(postId:number, remark:RejectPostRequest): Observable<RejectPostRequest>{
    return this.http.post<RejectPostRequest>(`${this.api}/post/${postId}/reject`, remark, {
      headers: new HttpHeaders({
        'userId': localStorage.getItem('userId') ?? "",
        'userRole': localStorage.getItem('userRole') ?? ""
      })
    });
  }

  postApprovePost(postId:number): Observable<Post>{
    return this.http.post<Post>(`${this.api}/post/${postId}/approve`, null, {
      headers: new HttpHeaders({
        'userId': localStorage.getItem('userId') ?? "",
        'userRole': localStorage.getItem('userRole') ?? ""
      })
    });
  }

/*
  postPost(post:PostRequest): Observable<PostRequest>{
    return this.http.post<PostRequest>(`${this.api}/create`, post, {
      headers: new HttpHeaders({
        'userId': localStorage.getItem('userId') ?? "",
        'userRole': localStorage.getItem('userRole') ?? ""
      })
    });
  }*/

 getPendingPosts():  Observable<Post[]>{
  return this.http.get<Post[]>(`${this.api}/pending`,
    {
      headers: new HttpHeaders({
        'userId': localStorage.getItem('userId') ?? "",
        'userRole': localStorage.getItem('userRole') ?? ""
      })
    }
  );
 }

}
