import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTestDB {
  @Field()
  title: string;

  @Field()
  content: string;
}
