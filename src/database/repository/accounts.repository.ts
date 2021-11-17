import { Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { Account, UpdateAccount } from "src/account/interfaces/accounts.interface";
import { RegistrationInterface } from "src/auth/interfaces/register.interface";
import { Post } from "src/posts/interfaces/post.interface";
import { Posts } from "../models/posts";
import { Users } from "../models/users";

@Injectable()
export class AccountsRepo{

    async findOneWithInclude(id: number): Promise<Account>{
        return await Users.findOne({
            include: [{
                model: Posts,
                attributes: ['photoPath', 'label', 'createdAt', 'postId']
            }],
            attributes:['username', 'email', 'id', 'desc'],
            where: {id}            
        }) as Account;
    }

    async findAll(id?: number): Promise<Account[]>{
        let where = {id: {[Op.ne]: id}};
        let attributes = ['id', 'username'];

        if(!id){
            attributes.push('desc');
            where = undefined;
        }

        return await Users.findAll({
            attributes,
            where 
        }) as Account[];
    }

    async delete(id: number): Promise<string>{
        await Users.destroy({where: {id}});
        return 'done';
    }

    async update(id: number, newValues: UpdateAccount): Promise<string>{
        await Users.update(newValues, {where: {id}});
        return 'done';
    }

    async create(newUser: RegistrationInterface){
        await Users.create(newUser);
    }

    async findOrCreate(user){
        await Users.findOrCreate({where: user});
    }

    async findOne(where, attributes?: string[]): Promise<Account>{
        return await Users.findOne({where, attributes}) as Account;
    }
}