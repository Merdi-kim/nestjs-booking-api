import { Injectable, ForbiddenException, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import {UserSignupData, UserSigninData} from './dto/index.dto'
import { User } from './user.entity';


@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>) {}

    async signup(data:UserSignupData) {
        try {
            const user = await this.userRepository.findOne({
                where:{
                    email:data.email
                }
            })
            if(user) throw new ForbiddenException('Email taken')
            const hash = await bcrypt.hash(data.password, 12)
            const createdUser = await this.userRepository.save({...data, password:hash})
            delete createdUser.password
            return createdUser
        }catch(err) {
            throw err
        }
        
    }

    async signin(data:UserSigninData) {
        try{
            const user = await this.userRepository.findOne({
                where:{
                    email:data.email
                }
            })
            if(!user){
                throw new NotFoundException('User not found')
            }
            const isPassword = await bcrypt.compare(data.password,user.password)
            if(!isPassword) {
                throw new ForbiddenException('wrong password')
            }
            delete user.password
            return user
        }catch(err) {
            throw err
        }
    }

    async getUser(id:number) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id
                }
            })
            if(!user) throw new NotFoundException('User not found')
            delete user.password
            return user
        }catch(err) {
            throw err
        }
    }

    async getUsers() {
        return await this.userRepository.find()
    }

    async deleteUser(email:string) {
        try {
            const user = await this.userRepository.findOne({
                where:{
                    email
                }
               })
               if(!user) throw new NotFoundException('User does not exist')
               await this.userRepository
                .createQueryBuilder()
                .delete()
                .from(User)
                .where("email=:email", {email})
                .execute()
               //await this.userRepository.delete(user) //delete(user)
               return 'deletion complete'
        }catch(err) {
            throw err
        }
    }
}
