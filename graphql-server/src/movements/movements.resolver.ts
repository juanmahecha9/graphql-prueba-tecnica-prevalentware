import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MovementsService } from './movements.service';
import { Movement, MovementRelationUser } from './entities/movement.entity';
import { CreateMovementInput } from './dto/create-movement.input';
import { UpdateMovementInput } from './dto/update-movement.input';

@Resolver(() => Movement)
export class MovementsResolver {
  constructor(private readonly movementsService: MovementsService) {}

  @Mutation((returns) => Movement)
  createNewMovement(
    @Args('createMovementInput') createMovementInput: CreateMovementInput,
  ) {
    return this.movementsService.create(createMovementInput);
  }

  @Query((returns) => [MovementRelationUser])
  findAllMovements() {
    return this.movementsService.findAll();
  }

  @Query((returns) => Movement, { name: 'movement' })
  findMovementById(@Args('id', { type: () => String }) id: string) {
    return this.movementsService.findOne(id);
  }

  @Mutation((returns) => Movement)
  updateMovement(
    @Args('updateMovementInput') updateMovementInput: UpdateMovementInput,
  ) {
    return this.movementsService.update(updateMovementInput);
  }
}
