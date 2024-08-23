import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestResolver } from './test.resolver';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  providers: [TestService, TestResolver, PrismaService],
})
export class TestModule {}
