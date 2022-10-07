import { Body, Controller, Delete, Post } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";

@Controller('bookmark')

export class BookmarkController {

    constructor(private bookmarkService:BookmarkService) {}

    @Post('new')
    addBookmark(@Body('email') email:string, @Body('hotelName') hotelName:string) {
        return this.bookmarkService.addBookmark(email, hotelName)
    }

    @Delete('delete')
    removeBookmark(@Body('email') email:string, @Body('hotelName') hotelName:string) {
        return this.bookmarkService.removeBookmark(email, hotelName)
    }
}