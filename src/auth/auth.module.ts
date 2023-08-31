import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'hola',
      signOptions: {expiresIn: '60s'}
    })
  ],

  providers: [AuthResolver, AuthService]

})
export class AuthModule {}
