import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import {Response,Request} from "express"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user : Repository<User>,
    private mail : MailService,
    private authService : AuthService
  ){}

  async create(createUserDto: CreateUserDto) {
    console.log("adljkf")
    const {email,name} = createUserDto
    const data = await this.mail.getMail(email)
   // const random5Digit = Math.floor(10000 + Math.random() * 90000);
    //createUserDto.userId = random5Digit

    if(await this.user.findOne({where : {name}})){
      return { success : "이름중복"}
    }else if(await this.user.findOne({where : {email}})){
      return { success : "이메일중복"}
    }

    if(!data||data.isVerified==false){
      return { success : "이메일 인증부터"}
    }
    await this.mail.remove(data.email)
    await this.user.save(createUserDto)
    return { success : true}
  }

  async findOne(userId: string) {
    const data = await this.user.findOne({where : {userId}})
    if(!data){
      return {userData : data}
    }
    data.password = null
    return {userData :data}
  }
  
  async update(userId: string, updateUserDto: UpdateUserDto, req : Request) {
    const data = await this.user.findOne({where : {userId}})
    const token = this.getToken(req)
    const verify = await this.authService.verify(token)//throw 시 에러나면 거기서 멈추고 반환 

    if(data&&data.email==verify.email&&!updateUserDto.email&&!updateUserDto.name&&!updateUserDto.password){//이메일 이름 바꾸기 방지 
      Object.assign(data,updateUserDto)
      await this.user.save(data)
      return {success : true}
    }
    return { success : false}
  } 

  async findPassword(password : string, req : Request){
    const token = this.getToken(req)
    const verify = await this.authService.verify(token)
    const {email} = verify
    const data = await this.mail.getMail(email)

    if(!data){
      return {success : "이메일인증발송부터"}
    }
    if(data.isVerified==false){
      return {success : "이메일인증부터"}
    }
    
    const userdata = await this.user.findOne({where : {email}})
    userdata.password = password;
    await this.user.save(userdata)
    await this.mail.remove(email)
    return {success : true}
  }

  getToken(req : Request){
    const authorization = req.headers.authorization;
    if(authorization && authorization.startsWith("Bearer ")){//Bearer으로 시작하는 문자열 찾기 
      return authorization.split(" ")[1]//공백을 기준으로 배열로 분할 
    }
    return null
  }

  async mypage(req : Request){

    const token = this.getToken(req);
    console.log(token,"token")
    const verify = await this.authService.verify(token)
    console.log(verify)
    const {email} = verify
    const data = await this.user.findOne({where : {email}})
    data.password = null;
    return data
  }

  async remove(req : Request) {
    const token = this.getToken(req)
    const verify = await this.authService.verify(token)
    const {email} = verify
    const data = await this.user.findOne({where : {email}})

    if(!data){
      return {success : "회원정보를 찾을수 없음"}
    }   

    await this.user.remove(data)
    return {success : true}
  }
}