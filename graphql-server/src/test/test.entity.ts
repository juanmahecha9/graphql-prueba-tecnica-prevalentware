import { ObjectType, Field, Int } from '@nestjs/graphql';

//Decorador para convertir esta clase en esquema de graphql
@ObjectType()
export class Test {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  title: string;

  @Field({ nullable: true })
  content?: string;
}

//Decorador para convertir esta clase en esquema de graphql
@ObjectType()
export class TestCreated {
  @Field((type) => Int)
  id: string;

  @Field((type) => String)
  content?: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  createdAt?: any;
}
