import { CallHandler, CanActivate, ExecutionContext, HttpServer, INestApplication, Injectable, NestInterceptor } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AccountModule } from "../accounts.module";
import { AccountService } from "../accounts.service";
import * as request from 'supertest';
import { Observable } from "rxjs";
import { JwtGuard } from "../../appGuards/jwt.guard";
import { JwtInterceptor } from "../../appInterceptors/jwt.interceptor";
import { UpdateAccount } from '../interfaces/accounts.interface';

class MockGuard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      return true;
    }
}

class MockInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        const req = context.switchToHttp().getRequest();

        req.body.user = {
            id: 1
        };

        return next.handle();
    }
}

let users = [{
    id: 1,
    email: '1',
    password: '1',
    username: '1',
    desc: '1'
},{
    id: 2,
    email: '2',
    password: '2',
    username: '2',
    desc: '2'
}];

const MockService = {
    getAllAccounts: jest.fn(() => users),

    getAccById: jest.fn((id: number) => {
        return users.find(user => user.id === id);
    }),

    deleteAccount: jest.fn((req) => {
        users = users.filter(user => user.id !== req.body.user.id);
        return 'success';
    }),

    updateAccount: jest.fn((req, newValues: UpdateAccount) => {
        const index = users.indexOf(
            users.find(user => user.id === req.body.user.id)
        );

        for(const [key, value] of Object.entries(newValues)){
            users[index][key] = value;
        }
        return 'done';
    })
};

describe('AccountsController', () => {
    let app: INestApplication;
    let server;

    beforeAll(async () => {
        const testModule = await Test.createTestingModule({
            imports: [AccountModule]
        })
        .overrideGuard(JwtGuard)
        .useValue(MockGuard)
        .overrideInterceptor(JwtInterceptor)
        .useValue(MockInterceptor)
        .overrideProvider(AccountService)
        .useValue(MockService)
        .compile();
        
        app = testModule.createNestApplication();
        app.useGlobalInterceptors(new MockInterceptor());
        await app.init();
        server = app.getHttpServer();
    });

    afterAll(async () => {
        await app.close();
    });

    it(`should return all accounts /GET`, async () => {
        await request(server)
            .get('/account/all')
            .expect(200)
            .expect(users);

        expect(MockService.getAllAccounts).toHaveBeenCalled();
    });

    it('should return account by id /GET', async () => {
        await request(server)
            .get('/account/1')
            .expect(200)
            .expect(users[0]);
        
        expect(MockService.getAccById).toHaveBeenCalledWith(1);
    });

    it('should update user account /PATCH', async () => {
        const newValues = {
            email: 'NEW EMAIL',
            password: 'NEW PASSWORD'
        };

        await request(server)
            .patch('/account')
            .send(newValues)
            .expect(200)
            .expect('done');
        
        expect(MockService.updateAccount).toHaveBeenCalled();
        expect(users[0].email).toBe(newValues.email);
        expect(users[0].password).toBe(newValues.password);
    });

    it('should delete account /DELETE', async () => {
        await request(server)
            .delete('/account')
            .expect(200)
            .expect('success');

        expect(MockService.deleteAccount).toHaveBeenCalled();

        const res = users.find(user => user.id === 1);
        expect(res).toBeFalsy();
    });
});