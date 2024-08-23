import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TestModule } from './test/test.module';
import { UsersModule } from './users/users.module';
import { MovementsModule } from './movements/movements.module';
import { TestingModule } from './testing/testing.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TestModule,
    UsersModule,
    MovementsModule,
    TestingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
