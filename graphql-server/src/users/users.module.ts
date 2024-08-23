import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CryptoService } from 'src/shared/crypto/crypto';

@Module({
  providers: [UsersResolver, UsersService, PrismaService, CryptoService],
})
export class UsersModule {}
