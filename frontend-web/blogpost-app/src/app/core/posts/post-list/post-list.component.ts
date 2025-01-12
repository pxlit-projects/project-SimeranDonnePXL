import { Component, inject, OnInit } from '@angular/core';
import { PostItemComponent } from '../post-item/post-item.component';
import { PostService } from '../../../shared/services/post.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
import { Post } from '../../../shared/models/post.model';
import { Filter } from '../../../shared/models/Filter.model';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostItemComponent, CommonModule, FilterComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  private filteredDataSubject = new BehaviorSubject<Post[]>([]);
  filteredData$: Observable<Post[]> = this.filteredDataSubject.asObservable();

  postService : PostService = inject(PostService);

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.postService.getPublishedPosts().subscribe({
      next: (post: Post[]) => {
        this.filteredDataSubject.next(post);

        console.log("the post", post);
        console.log("the list", this.filteredDataSubject);
      }
    });
  }

  handleFilter(filter: Filter): void {
    this.postService.filterPosts(filter).subscribe({
      next: (posts: Post[]) => {
        this.filteredDataSubject.next(posts);
      }
    });
  }
}
