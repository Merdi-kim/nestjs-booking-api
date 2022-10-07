import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs//typeorm'
import { Repository } from 'typeorm'
import { User } from "src/user/user.entity";

@Injectable()

export class BookmarkService{

    constructor(@InjectRepository(User) private userRepository:Repository<User>) {}

    async addBookmark(email:string, hotelName:string) {
        const user = await this.userRepository.findOne({
            where:{
                email
            }
        })
        if(!user) throw new NotFoundException('User not found')
        const isBookmarked = user.bookmarks.find(bookmark => bookmark === hotelName)
        if(isBookmarked) throw new ForbiddenException('Bookmarked already')
        const newBookmarks = [...user.bookmarks, hotelName]
        await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({...user, bookmarks:newBookmarks})
        .where("email=:email", {email})
        .execute()
        return ' Bookmarked'
    }

    async removeBookmark(email:string, hotelName:string) {
        const user = await this.userRepository.findOne({
            where:{
                email
            }
        })
        if(!user) throw new NotFoundException('User not found')
        const isBookmarked = user.bookmarks.find(bookmark => bookmark === hotelName)
        if(!isBookmarked) throw new ForbiddenException('Not yet bookmarked')
        const index = user.bookmarks.indexOf(hotelName)
        user.bookmarks.splice(index,1)
        await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({...user, bookmarks:user.bookmarks})
        .where("email=:email", {email})
        .execute()
        return 'Bookmark deleted'
    }
}