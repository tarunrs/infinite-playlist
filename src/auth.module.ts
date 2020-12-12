
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SpotifyStrategy } from './spotify.strategy';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'tarun@123',
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SpotifyStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
