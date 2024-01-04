import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user.entity';
import { JwtAuthGuard } from './auth.jwt.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports : [JwtModule.register({
    secret : "secret",
    signOptions : {expiresIn : "300000s"},
  }),TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService,JwtAuthGuard],
  exports : [AuthService,JwtAuthGuard,JwtModule]
})
export class AuthModule {}
