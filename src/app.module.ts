import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { HotelModule } from './hotel/hotel.module';
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [UserModule, HotelModule, BookmarkModule, ReservationModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'merkim',
    password: '12345',
    database: 'booking',
    entities: [User],
    synchronize: true,   //not advised for production
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource:DataSource) {}
}
