import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/inputs/login.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


 /// modularizar agregasndo servicio para crear toquen
 // que es el passport y la strategy ?

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);
    console.log(signupInput);

    const token = 'JWT123';

    return { token, user };

    throw new Error('No implementado');
  }

  async login(loginInput: LoginInput) {
    const { email, password } = loginInput;
    //find user by email
    const user = await this.usersService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
        throw new BadRequestException('Email/ Password do not match')
    }
    const payload = {sub: user.id, username: user.fullName}

    const access_token = await this.jwtService.signAsync(payload)
    return {
      user,
      token: access_token,
    };
  }
}
