import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';

import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Query(() => [Restaurant])
  getAll(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation(() => Restaurant)
  createRestaurant(@Args() body: CreateRestaurantDto): Restaurant {
    return body as Restaurant;
  }
}
