import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import {UserSignupData, UserSigninData} from './dto/index.dto'
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>) {}

    async signup(data:UserSignupData) {
        const hash = await bcrypt.hash(data.password, 12)
        return await this.userRepository.save({...data, password:hash})
    }

    async signin(data:UserSigninData) {
        const user = await this.userRepository.findOne({
            where:{
                email:data.email
            }
        })
        const userExists = await bcrypt.compare(data.password,user.password)
        return userExists ? user : new HttpException('no user', HttpStatus.NOT_FOUND)
    }

    async getUser(id:number) {
        return await this.userRepository.findOne({
            where: {
                id
            }
        })
    }

    deleteUser(id:number) {
        console.log(id)
        return "Why do you want to delete the user?"
    }
}
