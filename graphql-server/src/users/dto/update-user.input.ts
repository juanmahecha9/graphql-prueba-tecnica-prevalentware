import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field((type) => String, { description: 'UUID' })
  id: string;

  @Field((type) => String, { description: 'Nombre del usuario' })
  name: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  phone: string;

  @Field((type) => String)
  role: string;
}
