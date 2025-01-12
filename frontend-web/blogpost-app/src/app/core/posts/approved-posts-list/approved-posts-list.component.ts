import { Component, inject } from '@angular/core';
import { ApprovedPostsListItemComponent } from '../approved-posts-list-item/approved-posts-list-item.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification.service';
import { PostService } from '../../../shared/services/post.service';
import { Post } from '../../../shared/models/post.model';

@Component({
  selector: 'app-approved-posts-list',
  standalone: true,
  imports: [ApprovedPostsListItemComponent, CommonModule],
  templateUrl: './approved-posts-list.component.html',
  styleUrl: './approved-posts-list.component.css'
})
export class ApprovedPostsListComponent {
  private filteredDataSubject = new BehaviorSubject<Post[]>([]);
      filteredData$: Observable<Post[]> = this.filteredDataSubject.asObservable();
    
      postService : PostService = inject(PostService);
    
      ngOnInit(): void {
        this.fetchData();
      }
    
      fetchData(): void {
        this.postService.getApprovedPosts().subscribe({
          next: (post: Post[]) => {
            this.filteredDataSubject.next(post);
    
            console.log("the notification", post);
            console.log("the list", this.filteredDataSubject);
          }
        });
      }
}
