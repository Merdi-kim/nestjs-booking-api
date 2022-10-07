import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm'
import { Hotel } from "src/hotel/hotel.entity";
import { ReservationController } from "./reservation.controller";
import { ReservationService } from "./reservation.service";

@Module({
    imports:[TypeOrmModule.forFeature([Hotel])],
    controllers:[ReservationController],
    providers:[ReservationService]
})

export class ReservationModule{}