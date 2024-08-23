import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMovementInput {
  @Field((type) => String)
  concept: string;

  @Field((type) => String)
  amount: string;

  @Field((type) => String)
  userId: string;

  @Field((type) => String)
  type: string;
}
