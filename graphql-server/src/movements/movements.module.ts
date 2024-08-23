import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsResolver } from './movements.resolver';
import { PrismaService } from '../shared/prisma/prisma.service';

@Module({
  providers: [MovementsResolver, MovementsService, PrismaService],
})
export class MovementsModule {}
