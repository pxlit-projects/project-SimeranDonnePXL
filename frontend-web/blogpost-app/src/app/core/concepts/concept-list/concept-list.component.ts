import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostService } from '../../../shared/services/post.service';
import { Post } from '../../../shared/models/post.model';
import { ConceptItemComponent } from '../concept-item/concept-item.component';

@Component({
  selector: 'app-concept-list',
  standalone: true,
  imports: [CommonModule, ConceptItemComponent],
  templateUrl: './concept-list.component.html',
  styleUrl: './concept-list.component.css'
})
export class ConceptListComponent {
  private filteredDataSubject = new BehaviorSubject<Post[]>([]);
  filteredData$: Observable<Post[]> = this.filteredDataSubject.asObservable();

  postService : PostService = inject(PostService);

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.postService.getConceptPosts().subscribe({
      next: (post: Post[]) => {
        this.filteredDataSubject.next(post);

        console.log("the concept", post);
        console.log("the list", this.filteredDataSubject);
      }
    });
  }
}
