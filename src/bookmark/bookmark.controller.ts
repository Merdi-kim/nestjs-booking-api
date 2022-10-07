import { Controller, Delete, Post } from "@nestjs/common";

@Controller('bookmark')

export class BookmarkController {

    @Post('new')
    addBookmark() {

    }

    @Delete('delete')
    removeBookmark() {
        
    }
}