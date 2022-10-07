import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { HotelDto } from './hotel.dto';
import { Hotel } from './hotel.entity';
import { HotelService } from './hotel.service';

@Controller('hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Get()
  getHotels(): Promise<Hotel[]> {
    return this.hotelService.getHotels();
  }

  @Get('reservation/:hotelName')
  getReservationsForHotel(
    @Param('hotelName') hotelName: string,
    @Body('owner') owner: string,
  ): Promise<string[] | number> {
    return this.hotelService.getReservationsForHotel(hotelName, owner);
  }

  @Post('new')
  addHotel(@Body() data: HotelDto): Promise<Hotel> {
    return this.hotelService.addHotel(data);
  }

  @Post(':hotelName/edit')
  modifyHotelPrice(
    @Param('hotelName') hotelName: string,
    @Body('owner') owner: string,
    @Body('price', ParseIntPipe) price: number,
  ) {
    return this.hotelService.modifyHotelPrice(hotelName, owner, price);
  }

  @Delete('delete/:hotelName')
  deleteHotel(@Param('hotelName') hotelName: string, @Body('owner') owner: string): Promise<string> {
    return this.hotelService.deleteHotel(hotelName, owner);
  }
}
