import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get('http://localhost:3000/posts', {observe: 'response'});
  }

  addPost(post: Post) {
    return this.http.post('http://localhost:3000/posts', post, {observe: 'response'});
  }

  removePost(id: number) {
    return this.http.delete(`http://localhost:3000/posts/${id}`, {observe: 'response'});
  }

  updatePost(post: Post) {
    return this.http.put(`http://localhost:3000/posts/${post.id}`, post, {observe: 'response'})
  }
}
