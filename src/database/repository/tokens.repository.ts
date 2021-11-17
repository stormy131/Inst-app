import { Injectable } from "@nestjs/common";
import { RefTokens, RefTokenInfo} from "../models/refTokens";

@Injectable()
export class RefTokensRepo{
    async create(token: string){
        await RefTokens.create({token});
    }

    async findOne(token: string): Promise<RefTokenInfo>{
        return await RefTokens.findOne({where: {token}});
    }
}