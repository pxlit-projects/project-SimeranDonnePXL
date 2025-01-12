import { Component, inject, Input } from '@angular/core';
import { Post } from '../../../shared/models/post.model';
import { PostService } from '../../../shared/services/post.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approved-posts-list-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './approved-posts-list-item.component.html',
  styleUrl: './approved-posts-list-item.component.css'
})
export class ApprovedPostsListItemComponent {
  @Input() post!: Post;  
  postService:PostService = inject(PostService);
  router: Router = inject(Router);

  fb: FormBuilder = inject(FormBuilder);
  postForm: FormGroup = this.fb.group({

  });

  title:string = "";
  content:string = ""
  createdAt:string = "";
  name:string = "";
  status:string = "";

  ngOnInit(): void {
    console.log("post item", this.post);
    let date = new Date(this.post.createdAt);
    this.title = this.post.title;
    this.content = this.post.content;
    this.status = this.post.status;
    this.createdAt = `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    this.name = this.post.author.firstName + " " + this.post.author.lastName;
  }

  onSubmit() {
    console.log("post published");
    
    this.postService.publishPost(this.post.id).subscribe(post => {
    this.router.navigate(["/approved"]);})
  }
}
