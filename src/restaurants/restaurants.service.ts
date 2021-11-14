import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
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

  async updateRestaurant(dto: UpdateRestaurantDto): Promise<Restaurant> {
    const restaurant = await this.repo.findOne(dto.id);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    } else {
      Object.assign(restaurant, dto.data);
      return this.repo.save(restaurant);
    }
  }
}
