import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UseGuards, HttpStatus, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard("spotify"))
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/spotify")
  @UseGuards(AuthGuard("spotify"))
  async spotifyLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("/auth/spotify/callback")
  @UseGuards(AuthGuard("spotify"))
  async spotifyLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK
    };
  }
}