import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RefTokensRepo } from 'src/database/repository/tokens.repository';
import { AccountsRepo } from '../database/repository/accounts.repository';
import { AccountController } from './accounts.controller';
import { AccountService } from './accounts.service';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.TOKEN_SECRET
        })
    ],
    controllers: [AccountController],
    providers: [AccountService, AccountsRepo]
})
export class AccountModule {}
