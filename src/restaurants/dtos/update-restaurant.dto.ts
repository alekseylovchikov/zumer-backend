import {
  ArgsType,
  Field,
  InputType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
class UpdateRestaurantInputType extends PartialType(Restaurant) {}

@InputType()
export class UpdateRestaurantDto {
  @Field(() => Number)
  id: number;

  @Field(() => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
