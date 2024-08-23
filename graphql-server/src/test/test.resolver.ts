import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TestService } from './test.service';
import { Test, TestCreated } from './test.entity';
import { CreateTest } from './dto/create-test.input';
import { CreateTestDB } from './dto/create-input-db.input';

@Resolver()
export class TestResolver {
  constructor(private testService: TestService) {}

  //Definir que esto es una consulta de graphql
  @Query((returns) => [Test])
  tests() {
    return this.testService.findAll();
  }

  @Mutation((returns) => Test)
  addItem(@Args('testInput') testInput: CreateTest) {
    return this.testService.addItem(testInput);
  }

  @Mutation((returns) => TestCreated)
  async addIntoDB(@Args('testInput') testInput: CreateTestDB) {
    return await this.testService.addIntoDB(testInput);
  }
}
