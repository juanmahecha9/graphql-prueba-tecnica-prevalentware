import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Movement {
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

@ObjectType()
export class MovementRelationUser {
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

  @Field((type) => String)
  userName: string;
}
