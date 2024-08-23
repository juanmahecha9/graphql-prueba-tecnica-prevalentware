import * as JWT from 'jsonwebtoken';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  token(info) {
    return JWT.sign(info, btoa(process.env['JWT']), {
      algorithm: 'HS256',
      expiresIn: '8h',
    });
  }

  role(role: string) {
    const _role = btoa(role).concat('??').concat(process.env['ROLE']);
    const hash = crypto.createHash('sha256');
    hash.update(_role);
    return hash.digest('hex');
  }
}
