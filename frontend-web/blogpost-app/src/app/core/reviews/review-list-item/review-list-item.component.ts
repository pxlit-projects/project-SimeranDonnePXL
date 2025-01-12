import { Component, inject, Input } from '@angular/core';
import { ReviewService } from '../../../shared/services/review.service';
import { Post } from '../../../shared/models/post.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RejectPostRequest } from '../../../shared/models/RejectPostRequest.model';

@Component({
  selector: 'app-review-list-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-list-item.component.html',
  styleUrl: './review-list-item.component.css'
})
export class ReviewListItemComponent {
  @Input() post!: Post;
  reviewService:ReviewService = inject(ReviewService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  reviewForm: FormGroup = this.fb.group({
    remark: ['remark', Validators.required],
  });

  title:string = "";
  content:string = ""
  createdAt:string = "";
  name:string = "";
  status:string = "";

  ngOnInit(): void {
    console.log("review item", this.post);
    let date = new Date(this.post.createdAt);
    this.title = this.post.title;
    this.content = this.post.content;
    this.status = this.post.status;
    this.createdAt = `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    this.name = this.post.author.firstName + " " + this.post.author.lastName;
  }

  onSubmit(event:SubmitEvent) {
    const clickedButton = event.submitter as HTMLButtonElement;
    const requestType = clickedButton.value;
    
    const remark:RejectPostRequest = {
      ...this.reviewForm.value
    };

    if (requestType == "reject"){
      console.log("post is getting rejected");
      this.reviewService.postRejectRequest(this.post.id, remark).subscribe(post => {
      this.reviewForm.reset();
      this.router.navigate(["/review"]);
      })
    }
    else if (requestType == "approve"){
      console.log("is post approved: ", requestType)
      this.reviewService.postApprovePost(this.post.id).subscribe(post => {
      this.reviewForm.reset();
      this.router.navigate(["/review"]);
      })
    }
  }
}
