import { Body, Controller, Delete, Post } from "@nestjs/common";
import { ReservationService } from "./reservation.service";

@Controller('reservation')

export class ReservationController {

    constructor(private reservationService:ReservationService) {}

    @Post('new')
    reserve(@Body('email') email:string, @Body('hotelName') hotelName:string):Promise<string> {
        return this.reservationService.reserve(email, hotelName)
    }

    @Delete('delete')
    deleteReservation(@Body('email') email:string, @Body('hotelName') hotelName:string):Promise<string> {
        return this.reservationService.deleteReservation(email, hotelName)
    }
}