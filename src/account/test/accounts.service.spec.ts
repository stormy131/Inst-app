import { Test } from "@nestjs/testing";
import { AccountsRepo } from "../../database/repository/accounts.repository";
import { Users } from "../../database/models/users";
import { Posts } from "../../database/models/posts";
import { Comments } from "../../database/models/comments";
import { AccountService } from "../accounts.service";
import seq from "../../database/connection";
import createAssociations from "../../database/associations";

describe('AccountsService', () => {
    let accountsService: AccountService;
    let accountRepo: AccountsRepo;

    const user = {
        email: '1',
        password: '1',
        username: '1',
        desc: '1'
    };
    
    const user2 = {
        email: '2',
        password: '2',
        username: '2',
        desc: '2'
    };

    const userReq = (id: number) =>{
        return {
            body: {
                user: {id}
            }
        }
    };

    beforeAll(async () => {
        const testModule = await Test.createTestingModule({
            providers: [AccountService, AccountsRepo]
        }).compile();

        accountsService = testModule.get<AccountService>(AccountService);
        accountRepo = testModule.get<AccountsRepo>(AccountsRepo);
        
        createAssociations();
        await seq.sync({force:true});
        await accountRepo.create(user);
        await accountRepo.create(user2);
    });

    describe('get all', () => {
        it('should return user2 acc', async () => {
            expect(await accountsService.getAllAccounts(userReq(1)))
                .toEqual([{username: user2.username, id: 2}]);
        });
    });

    describe('get user acc', () => {
        it('should return user acc', async () => {
            const res = await accountsService.getUserAccount(userReq(1)); 
            expect({
                    username: res.username, 
                    email: res.email, 
                    id: res.id, 
                    desc: res.desc
                }).toEqual({
                    username: user.username,
                    email: user.email,
                    id: 1,
                    desc: user.desc
                });
        });
    });

    describe('get acc by id', () => {
        it('should return user2 acc', async () => {
            const res = await accountsService.getAccById(2);
            expect({username: res.username, email: res.email, id: res.id, desc: res.desc})
                .toEqual({
                    username: user2.username,
                    email: user2.email,
                    id: 2,
                    desc: user2.desc
                });
        });
    });
    
    describe('account updating', () => {
        const values = {
            desc: 'NEW TEST DESCRIPTION',
            email: 'NEW TEST EMAIL'
        };

        it('should update user(1) account', async () => {
            await accountsService.updateAccount(userReq(1), values);
            const res = await accountRepo.findOne(1);
            expect({
                desc: res.desc,
                email: res.email
            }).toEqual(values);
        });
    });

    describe('delete acc by id', () => {
        it('should delete account of user2', async () => {
            await accountsService.deleteAccount(userReq(2));
            expect(await accountRepo.findOne(2)).toBeFalsy();
        });
    });
});