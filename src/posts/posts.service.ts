import { Injectable } from "@nestjs/common";
import { PostInfo } from "../database/models/posts";
import { Post } from "./interfaces/post.interface";
import { promises as fsp } from 'fs';
import { CurrentUser } from "./interfaces/currentUser.interface";
import { FiltersService } from "./filters.service";
import { PostsRepo } from "../database/repository/posts.repository";
import { PostToUpdate } from "./interfaces/updatePost.interface";

@Injectable()
export class PostsService{
    constructor(
        private readonly filtersService: FiltersService,
        private readonly postsRepo: PostsRepo
    ){}

    async createPost(data: {user: CurrentUser, post: Post}, filter: string): Promise<string>{
        const post: Post = data.post;
        post.author = data.user.id;

        if(filter){
            await this.filtersService[filter](post.photoPath);
        }
        
        const file = post.photoPath.split('/').pop();
        const newPath = 'src/posts/photoStorage/original/' + file;
        await fsp.copyFile(post.photoPath, newPath);
        
        post.photoPath = filter ? newPath.replace('/original', '').replace('.', `${filter}.`) : newPath;
        
        await this.postsRepo.create(post);

        return 'done';
    }

    async deletePost(id: number): Promise<string>{
        const postToDelete = await this.postsRepo.findOne(id);
        await fsp.rm(postToDelete.photoPath);

        await this.postsRepo.delete(id)

        return 'done';
    }

    async updatePost(id: number, newProp: PostToUpdate): Promise<string>{
        const { photoPath } = newProp;
        if(photoPath){
            const prevPhoto = await this.postsRepo.findOne(id, ['photoPath']);

            await fsp.rm(prevPhoto.photoPath);

            const newPath = 'src/posts/photoStorage/' + 
                photoPath.split('/').pop();
                
            await fsp.cp(newProp.photoPath, newPath);
            newProp.photoPath = newPath;
        }

        await this.postsRepo.update(newProp as PostInfo, id);

        return 'done';
    }

    async removeFilters(id: number): Promise<string>{
        const prevPhoto = await this.postsRepo.findOne(id, ['photopath']);

        await fsp.rm(prevPhoto.photoPath);

        let newPhoto = prevPhoto.photoPath
            .replace('blur.', '.')
            .replace('sepia.', '.')
            .replace('greyscale.', '.');

        const path = newPhoto.split('/');
        path.splice(path.length - 1, 0, 'original');

        await this.postsRepo.update({ photoPath: path.join('/')} as PostInfo, id);

        return 'done';
    }

    async getPost(postId: number): Promise<any>{
        const res = this.postsRepo.findOneWithComments(postId);

        if(!res) return 'no such posts';
        return res;
    }
}