
import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userId: string, accessToken: string): Promise<any> {
    const user = await this.usersService.findOne(userId);
    console.log("In validate");
    console.log(user);
    if (user && user.accessToken === accessToken) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { userId: user.userId, spotifyToken: user.spotifyToken };
    console.log("Here");
    console.log(payload);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
