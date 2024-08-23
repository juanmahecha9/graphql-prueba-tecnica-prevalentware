import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../shared/prisma/prisma.service';
import { Auth, AuthResponse, User } from './entities/user.entity';
import { CryptoService } from '../shared/crypto/crypto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  findAll(): Promise<User[]> {
    return this.prisma.user_tbl.findMany();
  }

  async findById(id: string): Promise<User> {
    return this.prisma.user_tbl.findUnique({
      where: {
        id: id,
      },
    });
  }

  create(user: CreateUserInput): Promise<CreateUserInput> {
    return this.prisma.user_tbl.create({
      data: user,
    });
  }

  update(user: UpdateUserInput): Promise<UpdateUserInput> {
    return this.prisma.user_tbl.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  }

  //Este es solo para la autenticacion
  async auth(user: Auth): Promise<AuthResponse> {
    const _user = await this.prisma.user_tbl.findUnique({
      where: {
        email: user.email,
      },
    });

    if (_user === null || !_user)
      return {
        id: 'N/A',
        token: 'N/A',
        role: 'N/A',
      };

    //console.log(_user.password, user.password);
    if (_user.password != user.password)
      return {
        id: 'N/A',
        token: 'N/A',
        role: 'N/A',
      };

    const role = this.cryptoService.role(_user.role);
    const token = this.cryptoService.token({
      id: _user.id,
      name: _user.name,
    });

    return {
      id: _user.id,
      token: token,
      role: role,
    };
  }
}
