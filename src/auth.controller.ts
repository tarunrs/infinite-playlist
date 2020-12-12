import {
  Body,
  Controller,
  Dependencies,
  Get,
  Headers,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards, HttpStatus, Req } from '@nestjs/common';

@Controller('auth')
@Dependencies(AuthService)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/spotify')
  @UseGuards(AuthGuard('spotify'))
  async spotifyLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/spotify/callback')
  @UseGuards(AuthGuard('spotify'))
  async spotifyLoginRedirect(@Req() req: any, @Res() res): Promise<any> {
    console.log(req.user.user.id);
    console.log(req.user.accessToken);
    const cookie = await this.authService.login({
      userId: req.user.user.id,
      spotifyToken: req.user.accessToken,
    });
    res.setHeader('Authorization', 'Bearer ' + cookie.accessToken);
    res.cookie('jwt', cookie.accessToken, {
      httpOnly: true,
      secure: false,
    });
    return res.redirect(
      'http://infiniteplaylist.com/?access_token=' + req.user.accessToken + '&userId=' + req.user.user.id,
    );
  }
}
