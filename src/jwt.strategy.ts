import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user.entity';

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  console.log(token);
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: 'tarun@123',
    });
  }

  async validate(payload: { userId: string }): Promise<User> {
    console.log("in Validate");
    console.log(payload);
    const user = await this.userService.findOne(payload.userId);
    console.log(user);
    return user;
  }
}
