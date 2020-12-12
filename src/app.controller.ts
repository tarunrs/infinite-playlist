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
}
