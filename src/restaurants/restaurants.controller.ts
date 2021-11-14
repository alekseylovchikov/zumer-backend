import { Controller, Get } from '@nestjs/common';

import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsResolver } from './restaurants.resolver';

@Controller()
export class RestaurantsController {
  constructor(private readonly resolver: RestaurantsResolver) {}

  @Get()
  getAll(): Promise<Restaurant[]> {
    return this.resolver.getAll();
  }
}
