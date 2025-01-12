import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../shared/models/post.model';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css'
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  
  title:string = "";
  content:string = ""
  createdAt:string = "";
  name:string = "";

  ngOnInit(): void {
    console.log("post item", this.post);
    let date = new Date(this.post.createdAt);
    this.title = this.post.title;
    this.content = this.post.content;
    this.createdAt = `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    this.name = this.post.author.firstName + " " + this.post.author.lastName;
  }
}
