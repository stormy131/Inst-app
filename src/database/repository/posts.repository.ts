import { Injectable } from "@nestjs/common";
import { Post } from "src/posts/interfaces/post.interface";
import { Comments } from "../models/comments";
import { PostInfo, Posts } from "../models/posts";

@Injectable()
export class PostsRepo{
    async findAll(): Promise<PostInfo[]>{
        return await Posts.findAll();
    }

    async create(post: Post){
        await Posts.create(post);
    }

    async findOne(postId: number, attributes?: string[]): Promise<PostInfo>{
        return await Posts.findOne({
            where: {postId},
            attributes
        });
    }

    async delete(postId: number){
        await Posts.destroy({where: {postId}});
    }

    async update(newProp: PostInfo, postId){
        await Posts.update(newProp, {
            where: {postId},
        });
    }

    async findOneWithComments(postId: number): Promise<PostInfo>{
        return await Posts.findOne({
            where: {postId},
            include: [{
                model: Comments,
                attributes: ['sender', 'text', 'commentId']
            }]
        });
    }
}