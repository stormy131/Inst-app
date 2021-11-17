import { Injectable } from "@nestjs/common";
import { CommentInfo } from "../database/models/comments";
import { AccountsRepo} from '../database/repository/accounts.repository';
import { CommentsRepo } from "../database/repository/comments.repository";
import { PostsRepo } from "../database/repository/posts.repository";
import sendMail from "../mailSender.config";
import { Comment } from "./interfaces/comment.interface";

@Injectable()
export class CommentsService{
    constructor(
        private readonly commentsRepo: CommentsRepo,
        private readonly postsRepo: PostsRepo,
        private readonly accountRepo: AccountsRepo
    ){}

    private async notificate(comment: string, sender: string): Promise<void>{
        const words: string[] = comment.split(' ');
        const users = [];
        
        for(let i = 0; i < words.length; i++){
            const word = words[i];
            
            if(word[0] === '@'){
                users.push(await this.accountRepo.findOne({
                    username: word.slice(1)
                }, ['email']));
                // users.push(await Users.findOne({
                //     attributes: ['email'],
                //     where: {
                //         username: word.slice(1)
                //     }
                // }));
            }
        }

        users.forEach(user => {
            if(user) sendMail(user.email, comment, sender);
        });
        
    }

    async createComment(data: Comment, postId: number): Promise<string>{
        const {user, comment} = data;

        comment.sender = user.id;
        comment.fromPost = postId;
        await this.commentsRepo.create(comment as CommentInfo);

        await this.notificate(comment.text, user.username);
        return 'done';
    }

    async getComments(){

    }

    async deleteComment(commentId: number, userId: number, postId: number): Promise<string>{
        const {sender} = await this.commentsRepo.findOne(commentId);
        const {author} = await this.postsRepo.findOne(postId, ['author']);

        console.log(userId);

        if([sender, author].includes(userId)){
            await this.commentsRepo.delete(commentId);
            //await Comments.destroy({where: {commentId}});
            return 'done';
        }

        return 'you cannot delete this comment';
    }
}