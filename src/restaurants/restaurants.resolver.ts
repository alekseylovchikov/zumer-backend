import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';

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
  async createRestaurant(
    @Args('input') body: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(body);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation(() => Restaurant)
  async updateRestaurant(
    @Args('input') body: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantService.updateRestaurant(body);
  }
}
