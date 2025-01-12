import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../../shared/models/post.model';
import { PostService } from '../../../shared/services/post.service';
import { Router } from '@angular/router';
import { UpdatePostRequest } from '../../../shared/models/UpdatePostRequest.model';
import { RejectedPostModel } from '../../../shared/models/RejectedPostModel.model';

@Component({
  selector: 'app-rejected-posts-list-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rejected-posts-list-item.component.html',
  styleUrl: './rejected-posts-list-item.component.css'
})
export class RejectedPostsListItemComponent {
  @Input() rejected!: RejectedPostModel;
  postService:PostService = inject(PostService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  postForm: FormGroup = this.fb.group({
    title: ['title', Validators.required],
    content: ['content', Validators.required],
  });
  title:string = "";
  content:string = ""
  createdAt:string = "";
  name:string = "";
  status:string = "";
  remarks:string = "";

  ngOnInit(): void {
    console.log("post item", this.rejected);
    let date = new Date(this.rejected.createdAt);
    this.title = this.rejected.title;
    this.content = this.rejected.content;
    this.status = this.rejected.status;
    this.createdAt = `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    this.name = this.rejected.author.firstName + " " + this.rejected.author.lastName;
    this.remarks = this.rejected.remarks;
  }

  onSubmit() {
    const newPost:UpdatePostRequest = {
      ...this.postForm.value
    };

    this.postService.updateRejectedPost(this.rejected.id,newPost).subscribe(post => {
    this.postForm.reset();
    this.router.navigate(["/pending"]);})
  }
}
