import { Component, inject } from '@angular/core';
import { PendingPostItemComponent } from '../pending-post-item/pending-post-item.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../../../../shared/models/post.model';
import { PostService } from '../../../../shared/services/post.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pending-post-list',
  standalone: true,
  imports: [PendingPostItemComponent, CommonModule],
  templateUrl: './pending-post-list.component.html',
  styleUrl: './pending-post-list.component.css'
})
export class PendingPostListComponent {
  private filteredDataSubject = new BehaviorSubject<Post[]>([]);
      filteredData$: Observable<Post[]> = this.filteredDataSubject.asObservable();
    
      postService : PostService = inject(PostService);
    
      ngOnInit(): void {
        this.fetchData();
      }
    
      fetchData(): void {
        this.postService.getPendingPosts().subscribe({
          next: (post: Post[]) => {
            this.filteredDataSubject.next(post);
    
            console.log("the pending", post);
            console.log("the list", this.filteredDataSubject);
          }
        });
      }
}
