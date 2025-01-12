import { Routes } from '@angular/router';
import { UpdatePostComponent } from './core/posts/update-post/update-post.component';
import { AddPostComponent } from './core/posts/add-post/add-post.component';
import { PostListComponent } from './core/posts/post-list/post-list.component';
import { LoginComponent } from './core/login/login.component';
import { ConceptListComponent } from './core/concepts/concept-list/concept-list.component';
import { ReviewListComponent } from './core/reviews/review-list/review-list.component';
import { PendingPostListComponent } from './core/posts/pending-posts/pending-post-list/pending-post-list.component';
import { RejectedPostsListComponent } from './core/posts/rejected-posts-list/rejected-posts-list.component';
import { NotificationListComponent } from './core/notification/notification-list/notification-list.component';
import { ApprovedPostsListComponent } from './core/posts/approved-posts-list/approved-posts-list.component';

export const routes: Routes = [
    {path: "posts", component: PostListComponent},
    {path: "addPost", component: AddPostComponent},
    {path: "concepts", component: ConceptListComponent},
    {path: "login", component: LoginComponent},
    {path: "pending", component: PendingPostListComponent},
    {path: "rejected", component: RejectedPostsListComponent},
    {path: "approved", component: ApprovedPostsListComponent},
    {path: "review", component: ReviewListComponent},
    {path: "notifications", component: NotificationListComponent},
    {path: "", redirectTo: "posts", pathMatch: "full"},    
];
