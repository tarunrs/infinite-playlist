import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UseGuards, HttpStatus, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AdvancedConsoleLogger } from 'typeorm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('hello');
    return 'here';
  }

  @Get('/spotify')
  @UseGuards(AuthGuard('spotify'))
  async spotifyLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/auth/spotify/callback')
  @UseGuards(AuthGuard('spotify'))
  async spotifyLoginRedirect(@Req() req: any, @Res() res): Promise<any> {
    return res.redirect(
      'http://infiniteplaylist.com/?access_token=' + req.user.accessToken,
    );
  }
}
