import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TestModule } from './test/test.module';
import { UsersModule } from './users/users.module';
import { MovementsModule } from './movements/movements.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      //autoSchemaFile: true,
      //autoSchemaFile: join(__dirname, 'schema.gql'),
      playground: true,
      debug: true,
    }),
    TestModule,
    UsersModule,
    MovementsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
