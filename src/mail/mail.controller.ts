import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { CheckMailDto } from './dto/check-mail.dto';
import {Request,Response} from "express"

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("/send")
  send(@Body() body : CreateMailDto){
    return this.mailService.sendHello(body)
  }

  @Post("/mailcheck")
  mailcheck(@Body() body : CheckMailDto,@Req() req : Request, @Res() res : Response ){
    return this.mailService.mailcheck(body,req,res)
  }

  @Post("/test")
  test(){
    return this.mailService.getMail("ssdgf1101@gmail.com")
  }
}
