import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User, UserRole } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountOutput {
  @Field(() => String)
  email: string;
  @Field(() => UserRole)
  role: UserRole;
}
