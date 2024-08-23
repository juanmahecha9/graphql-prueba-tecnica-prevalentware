import { Injectable } from '@nestjs/common';
import { CreateMovementInput } from './dto/create-movement.input';
import { UpdateMovementInput } from './dto/update-movement.input';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Movement } from './entities/movement.entity';

@Injectable()
export class MovementsService {
  constructor(private readonly prisma: PrismaService) {}

  formatToTwoDecimalPlaces(value: any) {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return 'Invalid number';
    }
    return num.toFixed(2);
  }

  async findAll(): Promise<Movement[]> {
    const allMovements = await this.prisma.movement_tbl.findMany({
      include: {
        user: true, // Si tienes una relación de movimiento a usuario
      },
    });

    if (!allMovements || allMovements.length === 0) return [];

    return allMovements.map((movement) => {
      const userName = movement.user
        ? movement.user.name
        : 'Usuario no encontrado';
      return {
        id: movement.id,
        concept: movement.concept,
        amount: movement.amount,
        date: movement.date,
        userId: movement.userId,
        userName: userName,
        type: movement.type,
      };
    });
  }

  findOne(id: string): Promise<Movement> {
    return this.prisma.movement_tbl.findUnique({
      where: {
        id: id,
      },
    });
  }

  create(createMovementInput: CreateMovementInput): Promise<Movement> {
    const _amount = this.formatToTwoDecimalPlaces(createMovementInput.amount);
    return this.prisma.movement_tbl.create({
      data: {
        amount: _amount,
        userId: createMovementInput.userId,
        concept: createMovementInput.concept,
        date: new Date().toISOString(),
        type: createMovementInput.type,
      },
    });
  }

  update(updateMovementInput: UpdateMovementInput) {
    const _amount = this.formatToTwoDecimalPlaces(updateMovementInput.amount);
    return this.prisma.movement_tbl.update({
      data: {
        amount: _amount,
        userId: updateMovementInput.userId,
        concept: updateMovementInput.concept,
        type: updateMovementInput.type,
      },
      where: {
        id: updateMovementInput.id,
      },
    });
  }
}
