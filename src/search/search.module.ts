require('dotenv').config();
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AccountsRepo } from "../database/repository/accounts.repository";
import { PostsRepo } from "../database/repository/posts.repository";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.TOKEN_SECRET
        })
    ],
    controllers: [SearchController],
    providers: [SearchService, PostsRepo, AccountsRepo]
})
export class SearchModule{}