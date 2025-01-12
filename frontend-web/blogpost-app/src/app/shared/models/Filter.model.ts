import { Editor } from "./Editor.model";

export class Filter{
    content:string;
    author:string;
    date:Date;

    constructor(content:string, author:string, date:Date){
        this.content = content;
        this.author = author;
        this.date = date;
    }
}