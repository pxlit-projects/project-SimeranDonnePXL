import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../../../shared/models/post.model';
import { ReviewService } from '../../../shared/services/review.service';
import { CommonModule } from '@angular/common';
import { ReviewListItemComponent } from '../review-list-item/review-list-item.component';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, ReviewListItemComponent],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  private filteredDataSubject = new BehaviorSubject<Post[]>([]);
  filteredData$: Observable<Post[]> = this.filteredDataSubject.asObservable();

  reviewService : ReviewService = inject(ReviewService);

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.reviewService.getPendingPosts().subscribe({
      next: (post: Post[]) => {
        this.filteredDataSubject.next(post);

        console.log("review", post);
        console.log("the list", this.filteredDataSubject);
      }
    });
  }
}
