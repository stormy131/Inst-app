import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { JwtInterceptor } from '../appInterceptors/jwt.interceptor';
import { JwtGuard } from '../appGuards/jwt.guard';
import { AccountService } from './accounts.service';
import { AccountDto } from './dto/account.dto';
import { AccountInListDto } from './dto/listAccounts.dto';

@Controller('account')
@UseGuards(JwtGuard)
@UseInterceptors(JwtInterceptor)
export class AccountController {
    constructor(
        private readonly accountsService: AccountService
    ){}

    @Get('all')
    async getAllAccounts(@Req() req): Promise<AccountInListDto[]>{
        return await this.accountsService.getAllAccounts(req);
    }

    @Get(':id')
    async getAccountById(@Param('id') id: string): Promise<AccountDto>{
        return await this.accountsService.getAccById(+id);
    }

    @Get()
    async getUserAccount(@Req() req: Request): Promise<AccountDto>{
        return await this.accountsService.getUserAccount(req);
    }

    @Patch()
    async updateAccount(@Req() req: Request, @Body() newValues): Promise<string>{
        return await this.accountsService.updateAccount(req, newValues);
    }

    @Delete()
    async deleteAccount(@Req() req: Request): Promise<string>{
        const res = await this.accountsService.deleteAccount(req); 

        return 'success';
    }
}
