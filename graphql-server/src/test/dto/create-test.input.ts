import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTest {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;
}
