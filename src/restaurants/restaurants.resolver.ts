import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';

import { Restaurant } from './entities/restaurant.entity';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  @Query(() => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [].filter((el: Restaurant) => veganOnly && el.isVegan);
  }

  @Mutation(() => Restaurant)
  createRestaurant(@Args() body: CreateRestaurantDto): Restaurant {
    return body as Restaurant;
  }
}
