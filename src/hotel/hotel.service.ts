import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HotelDto } from './hotel.dto';
import { Hotel } from './hotel.entity';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async getHotels() {
    return await this.hotelRepository.find();
  }

  async getReservationsForHotel(hotelName: string, owner?) {
    try {
      const hotel = await this.hotelRepository.findOne({ where: { name: hotelName } });
      return owner == hotel.owner ? hotel.reservations : hotel.reservations.length;
    } catch (err) {
      throw err;
    }
  }

  async addHotel(data: HotelDto) {
    try {
      const hotel = await this.hotelRepository.findOne({
        where: {
          name: data.name,
        },
      });

      if (hotel) throw new ForbiddenException('Name taken');
      return await this.hotelRepository.save(data);
    } catch (err) {
      throw err;
    }
  }

  async modifyHotelPrice(hotelName, owner, price) {
    try {
      const hotel = await this.hotelRepository.findOne({
        where: {
          name: hotelName,
          owner,
        },
      });

      if (!hotel) throw new ForbiddenException('Hotel not found');

      if (hotel.price == price) throw new ForbiddenException('Price must be different from current price');

      await this.hotelRepository
        .createQueryBuilder()
        .update(Hotel)
        .set({ ...hotel, price })
        .where('name=:name', { name: hotelName })
        .execute();
      return 'Price updated';
    } catch (err) {
      throw err;
    }
  }

  async deleteHotel(hotelName, owner) {
    try {
      const hotel = await this.hotelRepository.findOne({
        where: {
          name: hotelName,
          owner,
        },
      });

      if (!hotel) throw new ForbiddenException('Hotel not found');
      await this.hotelRepository
        .createQueryBuilder()
        .delete()
        .from(Hotel)
        .where('name=:name', { name: hotelName })
        .execute();
      return 'Hotel deleted';
    } catch (err) {
      throw err;
    }
  }
}
