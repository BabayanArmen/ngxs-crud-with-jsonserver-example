import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddBook, AddPost, DeletePost, GetPosts, RemoveBook, UpdateBook, UpdatePost } from "../actions/product.actions";
import { Book } from "../models/book.model";
import { Magazin } from "../models/magazin.model";
import { Post } from "../models/post.model";
import { ProductService } from "../shared/services/product.service";
import { tap } from "rxjs/operators";

export class ProductStateModel {
    books: Book[];
    magazins: Magazin[];
    posts: Post[];
}

@State<ProductStateModel>({
    name: 'products',
    defaults: {
        books: [],
        magazins: [],
        posts: []
    }
})

@Injectable()
export class ProductState {

    constructor(private productService: ProductService) {}

    // @Selector()
    // static books(state: ProductStateModel) {
    //     return state.books
    // }

    // @Action(AddBook)
    // add(ctx: StateContext<ProductStateModel>, action: AddBook) {
    //     const state = ctx.getState();
    //     ctx.patchState({
    //         books:[
    //             ...state.books,
    //             action.book
    //         ]
    //     })
    // }

    // @Action(RemoveBook)
    // remove(ctx: StateContext<ProductStateModel>, action: RemoveBook) {
    //     const state = ctx.getState()
    //     ctx.patchState({
    //         books: state.books.filter(el => el.id != action.id)
    //     })
    // }

    // @Action(UpdateBook)
    // update(ctx: StateContext<ProductStateModel>, action: UpdateBook) {
    //     const state = ctx.getState();
    //     state.books.find(el => el.id == action.book.id).title = action.book.title
    //     ctx.patchState({
    //         books: [
    //             ...state.books,
    //         ]
    //     })
    // }

    //// posts
    @Action(GetPosts)
    getPosts(ctx: StateContext<ProductStateModel>, action: GetPosts) {
        return this.productService.getPosts()
        .pipe(
            tap(res => {
                ctx.patchState({
                    posts: res.body as Post[]
                })
            })
        )
    }

    @Action(AddPost)
    addPost(ctx: StateContext<ProductStateModel>, action: AddPost) {
        const state = ctx.getState()
        return this.productService.addPost(action.post)
        .pipe(
            tap(res => {
                ctx.patchState({
                    posts: [
                        ...state.posts,
                        res.body as Post
                    ]
                })    
            })
        )
    }

    @Action(UpdatePost)
    updatePost(ctx: StateContext<ProductStateModel>, action: UpdatePost) {
        return this.productService.updatePost(action.post)
        .pipe(
            tap(res => {
                ctx.dispatch(new GetPosts())
            })
        )
    }

    @Action(DeletePost)
    deletPost(ctx: StateContext<ProductStateModel>, action: DeletePost) {
        // const state = ctx.getState()
        return this.productService.removePost(action.id)
        .pipe(
            tap(res => {
                // ctx.patchState({
                //     posts: state.posts.filter(el => el.id != action.id)
                // })
                ctx.dispatch(new GetPosts())
            })
        )
    }
    
}