require('dotenv').config();

import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { RefTokensRepo } from "src/database/repository/tokens.repository";
import { AccountsRepo } from "../database/repository/accounts.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./auth.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.TOKEN_SECRET
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        GoogleStrategy,
        AccountsRepo,
        RefTokensRepo
    ]
})
export class AuthModule{}