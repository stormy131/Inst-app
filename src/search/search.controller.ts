import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../appGuards/jwt.guard";
import { SearchService } from "./search.service";

@Controller('search')
@UseGuards(JwtGuard)
export class SearchController{
    constructor(private readonly searchService: SearchService){}

    @Get('tag')
    async getByTag(@Query('tag') tag: string){
        return await this.searchService.getByTag(tag);
    }

    @Get('username')
    async getByUsername(@Query('username') username: string){
        return await this.searchService.getByUsername(username);
    }
}