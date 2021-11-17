require('dotenv').config();
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AccountsRepo } from "../database/repository/accounts.repository";
import { CommentsRepo } from "../database/repository/comments.repository";
import { PostsRepo } from "../database/repository/posts.repository";
import { CommentsService } from "./comments.service";
import { FiltersService } from "./filters.service";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.TOKEN_SECRET
        })
    ],
    controllers: [PostsController],
    providers: [
        PostsService, 
        CommentsService, 
        FiltersService, 
        PostsRepo,
        CommentsRepo,
        AccountsRepo
    ]
})
export class PostsModule{}