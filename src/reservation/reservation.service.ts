import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Hotel } from "src/hotel/hotel.entity";



@Injectable() 
export class ReservationService {

    constructor(@InjectRepository(Hotel) private hotelRepository:Repository<Hotel>) {}
   
    async reserve(email:string, hotelName:string) {
        const hotel = await this.hotelRepository.findOne({
            where:{
                name:hotelName
            }
        })
        if(!hotel) throw new NotFoundException('Hotel not found')
        const hasReserved = hotel.reservations.find(userEmail => userEmail === email)
        if(hasReserved) throw new ForbiddenException('Already reserved')
        const newReservations = [...hotel.reservations, email]
        await this.hotelRepository
        .createQueryBuilder()
        .update(Hotel)
        .set({...hotel, reservations:newReservations})
        .where("name=:name", {name:hotelName})
        .execute()
        return 'Reservation made'
    }

    async deleteReservation(email:string, hotelName:string) {
        const hotel = await this.hotelRepository.findOne({
            where: {
                name:hotelName
            }
        })

        if(!hotel) throw new ForbiddenException("Hotel not found")
        const hasReserved = hotel.reservations.find(userEmail => userEmail ===email)
        if(!hasReserved) throw new ForbiddenException('Reservation not found')
        const index = hotel.reservations.indexOf(email)
        hotel.reservations.splice(index,1)
        await this.hotelRepository
        .createQueryBuilder()
        .update(Hotel)
        .set({...hotel, reservations:hotel.reservations})
        .where("name=:name", {name:hotelName})
        .execute()
        return 'reservation cancelled'
    }
}