import { Editor } from "./Editor.model";

export class Post{
    id: number;
    title: string;
    content: string;
    author: Editor;
    createdAt: Date;
    status: string;

    constructor(id: number, title: string, content: string, author: Editor, createdAt: Date, status: string){
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdAt = createdAt;
        this.status = status;
    }
}