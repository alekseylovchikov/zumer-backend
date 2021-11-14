import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant) private readonly repo: Repository<Restaurant>,
  ) {}

  getAll(): Promise<Restaurant[]> {
    return this.repo.find();
  }

  createRestaurant(dto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.repo.create(dto);
    return this.repo.save(restaurant);
  }
}
