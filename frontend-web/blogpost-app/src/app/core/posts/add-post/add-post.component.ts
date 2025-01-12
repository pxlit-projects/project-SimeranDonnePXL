import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../../shared/services/post.service';
import { PostRequest } from '../../../shared/models/PostRequest.model';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  postService:PostService = inject(PostService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  postForm: FormGroup = this.fb.group({
    title: ['title', Validators.required],
    content: ['content', Validators.required],
  });

  onSubmit(event:SubmitEvent) {
    const newPost:PostRequest = {
      ...this.postForm.value
    };

    const clickedButton = event.submitter as HTMLButtonElement;
    const requestType = clickedButton.value;

    if(requestType == "create"){
        this.postService.postPost(newPost).subscribe(post => {
        this.postForm.reset();
        this.router.navigate(["/posts"]);
      })
    }
    
    else if(requestType == "concept"){
        this.postService.postConcept(newPost).subscribe(post => {
        this.postForm.reset();
        this.router.navigate(["/concepts"]);
      })
    }
  }
}
