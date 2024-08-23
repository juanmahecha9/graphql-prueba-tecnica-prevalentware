import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field((type) => String, { description: 'Nombre del usuario' })
  name: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  phone: string;

  @Field((type) => String)
  role: string;

  @Field((type) => String)
  password: string;
}
