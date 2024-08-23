import { CreateMovementInput } from './create-movement.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMovementInput extends PartialType(CreateMovementInput) {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  concept: string;

  @Field((type) => String)
  amount: string;

  @Field((type) => String)
  date: string;

  @Field((type) => String)
  userId: string;

  @Field((type) => String)
  type: string;
}
