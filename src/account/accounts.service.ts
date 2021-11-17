import { Injectable } from "@nestjs/common";
import { AccountInList, Account, UpdateAccount } from "./interfaces/accounts.interface";
import { AccountsRepo } from "../database/repository/accounts.repository";

@Injectable()
export class AccountService {
    constructor(private readonly accountsRepo: AccountsRepo){}

    async getAllAccounts(req): Promise<AccountInList[]>{
        const res = await this.accountsRepo.findAll(req.body.user.id);

        return res.map(acc => {
            return {id: acc.id, username: acc.username};
        });
    }

    async getAccById(id: number): Promise<Account>{
        return await this.accountsRepo.findOneWithInclude(id);
    }

    async getUserAccount(req): Promise<Account>{
        return await this.getAccById(req.body.user.id);
    }

    async deleteAccount(req): Promise<string>{
        return await this.accountsRepo.delete(req.body.user.id);
    }

    async updateAccount(req, newValues: UpdateAccount): Promise<string>{
        return this.accountsRepo.update(req.body.user.id, newValues);
    }
}