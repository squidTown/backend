import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {Response} from "express"
import { JwtAuthGuard } from './auth.jwt.guard'; // JwtAuthGuard 임포트 수정
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async create(@Body() createAuthDto: CreateAuthDto, @Res() res : Response) {
    const login = await this.authService.login(createAuthDto,res)
    res.send(login)
  }

  @Post("/logout")
  logout(@Res() res : Response){
    this.authService.logout(res)
  }
}
