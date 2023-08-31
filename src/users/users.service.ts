import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'


import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupInput } from 'src/auth/dto/inputs/signup.input';
import { Args } from '@nestjs/graphql';


@Injectable()
export class UsersService {

    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async create(signUpInput: SignupInput): Promise<User> {
    try {
      const newUser = this.userRepository.create({
        ...signUpInput,
        password: bcrypt.hashSync(signUpInput.password, 10)
      })
      return await this.userRepository.save(newUser);
    } catch(error){
      console.log(error)
      throw new BadRequestException('Algo Salio Mal')
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  findOne(id: number) {
    return [];
  }

  async findOneByEmail (email: string): Promise<User> {
    try {

      return await this.userRepository.findOneByOrFail({email})
      
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
