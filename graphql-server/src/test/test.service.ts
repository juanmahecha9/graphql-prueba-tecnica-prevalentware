import { Injectable } from '@nestjs/common';
import { Test } from './test.entity';
import { CreateTest } from './dto/create-test.input';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTestDB } from './dto/create-input-db.input';

@Injectable()
export class TestService {
  TEST_DATA: Test[] = [
    {
      id: '12345-67890-000',
      title: 'Esta es una prueba',
      content: 'Creando un ejemplo desde Nest.js con Graphlq',
    },
    {
      id: '12345-67890-001',
      title: 'Esta es una prueba 1',
      content: 'Creando un ejemplo desde Nest.js con Graphlq 1',
    },
  ];

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Test[] {
    return this.TEST_DATA;
  }

  addItem(test: CreateTest): CreateTest {
    this.TEST_DATA.push(test);
    return test;
  }

  addIntoDB(test: CreateTestDB): Promise<CreateTestDB> {
    return this.prisma.test_tbl.create({
      data: test,
    });
    //return test;
  }
}
