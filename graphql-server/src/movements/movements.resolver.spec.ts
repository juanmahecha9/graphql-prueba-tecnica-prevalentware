import { Test, TestingModule } from '@nestjs/testing';
import { MovementsResolver } from './movements.resolver';
import { MovementsService } from './movements.service';

describe('MovementsResolver', () => {
  let resolver: MovementsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementsResolver, MovementsService],
    }).compile();

    resolver = module.get<MovementsResolver>(MovementsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
