import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
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

@InputType()
export class Auth {
  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;
}

@ObjectType()
export class AuthResponse {
  @Field((type) => String)
  token: string;

  @Field((type) => String)
  role: string;

  @Field((type) => String)
  id: string;
}
