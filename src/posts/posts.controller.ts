import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from '../appGuards/jwt.guard';
import { JwtInterceptor } from '../appInterceptors/jwt.interceptor';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { CurrentUserDto } from './dto/currentUser.dto';
import { PostToPatchDto } from './dto/patchPost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(JwtGuard)
@UseInterceptors(JwtInterceptor)
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly commentsService: CommentsService
    ) { }

    @Get(':id')
    async getPostById(@Param('id') id: number): Promise<any>{
        return await this.postsService.getPost(id);
    }

    @Post()
    async createPost(@Body() data, @Query('filter') filter: string): Promise<string> {
        return await this.postsService.createPost(data, filter);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string): Promise<string> {
        return await this.postsService.deletePost(+id);
    }

    @Patch(':id')
    async updatePost(@Param('id') id: string, @Body() patchOpt: PostToPatchDto): Promise<string> {
        return await this.postsService.updatePost(+id, patchOpt);
    }

    @Patch(':id/original')
    async removeFilters(@Param('id') id: string): Promise<string>{
        return await this.postsService.removeFilters(+id);
    }

    @Post(':id')
    async createComment(@Body() comment: CommentDto, @Param('id') id: string): Promise<string> {
        return await this.commentsService.createComment(comment, +id);
    }

    @Delete(':postId/:commentId')
    async deleteComment(@Param('commentId') commentId: number, @Body() body: {user: CurrentUserDto},
        @Param('postId') postId: number): Promise<string> {
        return await this.commentsService.deleteComment(commentId, body.user.id, postId);
    }
}
