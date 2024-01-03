import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user.entity';
import { Repository } from 'typeorm';
import {Response,Request} from "express"
@Injectable()
export class AuthService {
  constructor(
    private jwtService : JwtService,
    @InjectRepository(User)
    private user : Repository<User>
  ){}

  async login(createAuthDto : CreateAuthDto, res : Response){
    const {email,password} = createAuthDto
    const find = await this.user.findOne({where : {email,password}})
    if(!find){
      return {success : "로그인정보안맞으"}
    }
    const login = {email : email, roles : "user", uuid : find.userId, name : find.name}//수정됨
    try{
      const token = this.jwtService.sign(login)
      return {success : true,token : token }
    }catch{
      throw new UnauthorizedException("로그인실패입니다..")
    }
  }

  async verify(/*createAuthDto: CreateAuthDto*/token : string) {
    try{
      const verify = await  this.jwtService.verifyAsync(token,{secret : "secret"})
      return verify
    }catch(error){
      throw new UnauthorizedException("만료되었거나 없는 토큰입니다...")
    }
  }

  logout(res : Response){
    res.cookie("jwt","",{
      maxAge: 0

    })
  }


  async verify2(req : Request){
    try{
      const token = this.getToken(req)
      if(!token){
         throw new UnauthorizedException("만료된거나 없는토큰")
      }
      const verify = await this.jwtService.verifyAsync(token,{secret : "secret"})
      return verify
    }catch(error){
      throw new UnauthorizedException("만료된거나 없는토큰")
    }

  }



  
  getToken(req : Request){
    const authorization = req.headers.authorization;
    if(authorization && authorization.startsWith("Bearer ")){//Bearer으로 시작하는 문자열 찾기 
      return authorization.split(" ")[1]//공백을 기준으로 배열로 분할 
    }
    return null
  }
}
