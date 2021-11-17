import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/accounts.module';
import { PostsModule } from './posts/posts.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [AuthModule, AccountModule, PostsModule, SearchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
