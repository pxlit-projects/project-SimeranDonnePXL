import { Component, inject, Input } from '@angular/core';
import { Post } from '../../../shared/models/post.model';
import { ConceptStatusItemComponent } from '../concept-status-item/concept-status-item.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../shared/services/post.service';
import { Router } from '@angular/router';
import { PostRequest } from '../../../shared/models/PostRequest.model';
import { ConceptToPostRequest } from '../../../shared/models/ConceptToPostRequest.model';

@Component({
  selector: 'app-concept-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './concept-item.component.html',
  styleUrl: './concept-item.component.css'
})
export class ConceptItemComponent {
  @Input() concept!: Post;
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

  ngOnInit(): void {
    console.log("post item", this.concept);
    let date = new Date(this.concept.createdAt);
    this.title = this.concept.title;
    this.content = this.concept.content;
    this.status = this.concept.status;
    this.createdAt = `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    this.name = this.concept.author.firstName + " " + this.concept.author.lastName;
  }

  onSubmit() {
    const newPost:ConceptToPostRequest = {
      id: this.concept.id,
      ...this.postForm.value
    };

    this.postService.postConceptToPost(newPost).subscribe(post => {
    this.postForm.reset();
    this.router.navigate(["/pending"]);})
  }
}
