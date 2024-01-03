import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/auth.jwt.guard';
import {Response,Request} from "express"

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create")//회원가입
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("/findpassword")
  findpassword(@Body() Body : UpdateUserDto, @Req() req : Request){
    return this.userService.findPassword(Body.password,req)
  }

  @Get('/mypage')
 // @UseGuards(JwtAuthGuard)
  async findOne(@Req() req : Request, @Res() res : Response) {
    console.log("네 요청 받았습니단")
    const data = await this.userService.mypage(req);
    res.send( {data : data, success  : true})
  }

  @Get("/findall")
  findall(){
  }
  

  @Patch(':id')//정보수정
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req : Request) {
    return this.userService.update(id, updateUserDto,req);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req : Request) {
    return this.userService.remove(req);
  }
}
