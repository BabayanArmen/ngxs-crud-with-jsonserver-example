import { Book } from "../models/book.model";
import { Post } from "../models/post.model";

export class AddBook {
    static readonly type = "[Product] Add Book";
    constructor(public book:Book) {}
}

export class RemoveBook {
    static readonly type = "[Product] Remove Book";
    constructor(public id:number) {}
}

export class UpdateBook {
    static readonly type = "[Product] Update Book";
    constructor(public book:Book) {}
}

//// posts
export class GetPosts {
    static readonly type = "[Product] Get Posts";
}

export class AddPost {
    static readonly type = "[Product] Add Post";
    constructor(public post:Post) {}
}

export class UpdatePost {
    static readonly type = "[Product] Update Post"
    constructor(public post: Post) {}
}

export class DeletePost {
    static readonly type = "[Product] Delete Post"
    constructor(public id: number) {}
}