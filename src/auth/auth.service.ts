import { Injectable} from '@nestjs/common';
import { LoginInterface } from './interfaces/login.interface';
import { RegistrationInterface } from './interfaces/register.interface';
import { AccountsRepo } from '../database/repository/accounts.repository';
import { RefTokensRepo } from 'src/database/repository/tokens.repository';
import { JwtService } from '@nestjs/jwt';
const { or } = require('sequelize').Op;

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepo: AccountsRepo,
    private readonly tokenRepo: RefTokensRepo,
    private readonly jwtService: JwtService
  ){}

  async postLogin(loginData: LoginInterface): Promise<any>{
    const res = await this.accountRepo.findOne(loginData, ['username', 'id']);

    if(!res) return 'Invalid user data';

    const token = this.jwtService.sign({username: res.username, id: res.id}, {expiresIn: '1h'});
    const refToken = this.jwtService.sign({username: res.username, id: res.id});

    await this.tokenRepo.create(refToken);

    return {
      token,
      refToken
    };
  }

  async postReg(newUser: RegistrationInterface): Promise<string>{
    const alreadyExists = await this.accountRepo.findOne({
      [or]: [
        {email: newUser.email},
        {username: newUser.username}
      ]
    });

    if(alreadyExists){
      return 'Provied email or username is already in use';
    }

    await this.accountRepo.create(newUser);
    return 'created, now go to login';
  }

  async refreshToken(oldToken: string, token: string){
    const res = await this.tokenRepo.findOne(token);
    const data = this.jwtService.decode(oldToken);
    console.log('-------------------');
    console.log(data);

    if(res) return this.jwtService.sign(data, {expiresIn: '1h'});
  }

  async googleLogin(request){
    const { user } = request;

    if(!user){
      return 'no user from google';
    }

    await this.accountRepo.findOrCreate(user);

    return {
      message: 'User info from Google',
      user: user
    };
  }
}
