import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostRequest } from '../models/PostRequest.model';
import { ConceptToPostRequest } from '../models/ConceptToPostRequest.model';
import { Filter } from '../models/Filter.model';
import { RejectedPostModel } from '../models/RejectedPostModel.model';
import { UpdatePostRequest } from '../models/UpdatePostRequest.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  api:string = "http://localhost:8083/post/api/posts";
  http:HttpClient = inject(HttpClient); 

  constructor() { }

  getPublishedPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.api}/all`);
  }

  getApprovedPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.api}/approved`,
      {
        headers: new HttpHeaders({
          'userId': localStorage.getItem('userId') ?? "",
          'userRole': localStorage.getItem('userRole') ?? ""
        })
      }
    );
  }

  publishPost(postId:number){
    return this.http.put<null>(`${this.api}/${postId}/post/publish`, null, {
      headers: new HttpHeaders({
        'userId': localStorage.getItem('userId') ?? "",
        'userRole': localStorage.getItem('userRole') ?? ""
      })
    });
  }

  postPost(post:PostRequest): Observable<PostRequest>{
    return this.http.post<PostRequest>(`${this.api}/create`, post, {
      headers: new HttpHeaders({
        'userId': localStorage.getItem('userId') ?? "",
        'userRole': localStorage.getItem('userRole') ?? ""
      })
    });
  }

  getConceptPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.api}/concepts`,
      {
        headers: new HttpHeaders({
          'userId': localStorage.getItem('userId') ?? "",
          'userRole': localStorage.getItem('userRole') ?? ""
        })
      }
    );
  }

  postConcept(post:PostRequest): Observable<PostRequest>{
    return this.http.post<PostRequest>(`${this.api}/concept`, post, {
      headers: new HttpHeaders({
        'userId': localStorage.getItem('userId') ?? "",
        'userRole': localStorage.getItem('userRole') ?? ""
      })
    });
  }

  postConceptToPost(post:ConceptToPostRequest): Observable<PostRequest>{
    return this.http.post<PostRequest>(`${this.api}/concept/create/post`, post, {
      headers: new HttpHeaders({
        'userId': localStorage.getItem('userId') ?? "",
        'userRole': localStorage.getItem('userRole') ?? ""
      })
    });
  }

  updateRejectedPost(postId:number,post:UpdatePostRequest): Observable<UpdatePostRequest>{
    return this.http.put<UpdatePostRequest>(`${this.api}/${postId}/post/update`, post, {
      headers: new HttpHeaders({
        'userId': localStorage.getItem('userId') ?? "",
        'userRole': localStorage.getItem('userRole') ?? ""
      })
    })
  }

  getPendingPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.api}/pending`,
      {
        headers: new HttpHeaders({
          'userId': localStorage.getItem('userId') ?? "",
          'userRole': localStorage.getItem('userRole') ?? ""
        })
      }
    );
  }

  getRejectedPosts(): Observable<RejectedPostModel[]>{
    return this.http.get<RejectedPostModel[]>(`${this.api}/rejected`,
      {
        headers: new HttpHeaders({
          'userId': localStorage.getItem('userId') ?? "",
          'userRole': localStorage.getItem('userRole') ?? ""
        })
      }
    );
  }

  filterPosts(filter: Filter): Observable<Post[]> {
    return this.http.get<Post[]>(this.api + "/all").pipe(
      map((post: Post[]) => post.filter(post => this.isPostMatchingFilter(post, filter)))
    );
  }

  private isPostMatchingFilter(post: Post, filter: Filter): boolean {
    let author: string = post.author.firstName + " " + post.author.lastName;
    let postDate: Date = new Date(post.createdAt);
    let filterDate: Date = new Date(filter.date);
  
    const matchesContent = filter.content ? post.content.toLowerCase().includes(filter.content.toLowerCase()) : true;
    const matchesAuthor = filter.author ? author.toLowerCase().includes(filter.author.toLowerCase()) : true;
    const matchesDate = filter.date ? 
      postDate.getFullYear() === filterDate.getFullYear() &&
      postDate.getMonth() === filterDate.getMonth() &&
      postDate.getDate() === filterDate.getDate() : true;
    
    return (matchesContent && matchesAuthor && matchesDate);
  }  
}
