import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Auth, AuthResponse, User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => [User])
  async findAllUsers() {
    return await this.usersService.findAll();
  }

  @Query((returns) => User)
  async findUserById(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.findById(id);
  }

  @Mutation((returns) => User)
  async createNewUser(@Args('createUser') createUser: CreateUserInput) {
    return await this.usersService.create(createUser);
  }

  @Mutation((returns) => User)
  async updateUser(@Args('updateUser') updateUser: UpdateUserInput) {
    return await this.usersService.update(updateUser);
  }

  @Query((returns) => AuthResponse)
  async auth(@Args('auth') auth: Auth) {
    return await this.usersService.auth(auth);
  }
}
