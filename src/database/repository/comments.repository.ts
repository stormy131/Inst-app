import { Injectable } from "@nestjs/common";
import { CommentInfo, Comments } from "../models/comments";

@Injectable()
export class CommentsRepo{
    async create(comment: CommentInfo){
        await Comments.create(comment);
    }

    async delete(commentId: number){
        await Comments.destroy({where: {commentId}});
    }

    async findOne(commentId: number): Promise<CommentInfo>{
        return await Comments.findOne({
            attributes: ['sender'],
            where: {commentId}
        });
    }
}