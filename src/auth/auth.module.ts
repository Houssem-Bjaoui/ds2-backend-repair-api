import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({

    imports: [
      // importer users module bch nesta3mlou service mta3ou
      UsersModule,

      // configuration mta3 JWT
      JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1w' },
    }),
    ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],

})
export class AuthModule {}
