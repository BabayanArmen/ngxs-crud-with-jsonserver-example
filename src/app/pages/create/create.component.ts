import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddBook, AddPost } from 'src/app/actions/product.actions';
import { Post } from 'src/app/models/post.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  // addProduct(title: string) {
  //   let id = Math.round(Math.random() * 1000 );
  //   let book = {
  //     id,
  //     title
  //   }
  //   this.store.dispatch(new AddBook(book))
  // }

  addPost(title) {
    let post:Post = {
      title,
      author: "Armen"
    }
    this.store.dispatch(new AddPost(post))
  }

}
