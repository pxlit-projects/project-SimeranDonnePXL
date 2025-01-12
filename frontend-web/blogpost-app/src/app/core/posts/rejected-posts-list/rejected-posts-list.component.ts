import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostService } from '../../../shared/services/post.service';
import { Post } from '../../../shared/models/post.model';
import { CommonModule } from '@angular/common';
import { RejectedPostsListItemComponent } from '../rejected-posts-list-item/rejected-posts-list-item.component';
import { RejectedPostModel } from '../../../shared/models/RejectedPostModel.model';

@Component({
  selector: 'app-rejected-posts-list',
  standalone: true,
  imports: [CommonModule, RejectedPostsListItemComponent],
  templateUrl: './rejected-posts-list.component.html',
  styleUrl: './rejected-posts-list.component.css'
})
export class RejectedPostsListComponent {
    private filteredDataSubject = new BehaviorSubject<RejectedPostModel[]>([]);
    filteredData$: Observable<RejectedPostModel[]> = this.filteredDataSubject.asObservable();
  
    postService : PostService = inject(PostService);
  
    ngOnInit(): void {
      this.fetchData();
    }
  
    fetchData(): void {
      this.postService.getRejectedPosts().subscribe({
        next: (post: RejectedPostModel[]) => {
          this.filteredDataSubject.next(post);
  
          console.log("the rejected", post);
          console.log("the list", this.filteredDataSubject);
        }
      });
    }
}
