import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeletePost, GetPosts, RemoveBook, UpdateBook, UpdatePost } from 'src/app/actions/product.actions';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductState } from 'src/app/state/product.state';
import { tap } from 'rxjs/operators';
import { Book } from 'src/app/models/book.model';
import { Post } from 'src/app/models/post.model';
import { loggerOptionsFactory } from '@ngxs/logger-plugin/src/logger.module';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  books$: Observable<Book[]>;
  // @Select(ProductState.books) books$: Observable<Book[]>
  posts$: Observable<Post[]>;

  constructor(private store: Store, private productService: ProductService) { }

  ngOnInit(): void {
    this.store.dispatch(new GetPosts()).subscribe(() => {
      this.posts$ = this.store.select(state => state.products.posts)
    })
    this.books$ = this.store.select(state => state.products.books)   
  }

  // removeBook(id) {
  //   this.store.dispatch(new RemoveBook(id))
  // }

  // updateBook(title: string, book: Book) {
  //   book.title = title;
  //   this.store.dispatch(new UpdateBook(book))
  // }

  removePost(id: number) {
    this.store.dispatch(new DeletePost(id))
  }

  updatePost(post: Post, title) {
    post.title = title;
    this.store.dispatch(new UpdatePost(post))
  }

}
