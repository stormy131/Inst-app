import { Injectable } from "@nestjs/common";
import { Account } from "../account/interfaces/accounts.interface";
import { AccountsRepo } from "../database/repository/accounts.repository";
import { PostsRepo } from "../database/repository/posts.repository";
import { Post } from "../posts/interfaces/post.interface";

@Injectable()
export class SearchService{
    constructor(
        private readonly postsRepo: PostsRepo,
        private readonly accountsRepo: AccountsRepo
    ){}

    async getByTag(tag: string): Promise<{posts: Post[], users: Account[]}>{
        const posts = await this.postsRepo.findAll();
        const users = await this.accountsRepo.findAll();

        let res = {
            posts: [],
            users: []
        };

        res.posts = posts.filter(post => {
            if(!post.label) return false;

            const words = post.label.split(' ');

            for(let word of words){
                if(word[0] === '#' && word.slice(1) === tag) {
                    return true;
                }
            }

            return false;
        });

        res.users = users.filter(user => {
            if(!user.desc) return false;

            const words = user.desc.split(' ');

            for(let word of words){
                if(word[0] === '#' && word.slice(1) === tag) return true;
            }

            return false;
        });
        return res;
    }

    async getByUsername(username: string): Promise<Account[]>{
        const users = await this.accountsRepo.findAll();

        return users.filter(user => user.username.includes(username) ? true : false);
    }
}