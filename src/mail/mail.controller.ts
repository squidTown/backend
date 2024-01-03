import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { CheckMailDto } from './dto/check-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("/send")
  send(@Body() body : CreateMailDto){
    return this.mailService.sendHello(body)
  }

  @Post("/mailcheck")
  mailcheck(@Body() body : CheckMailDto ){
    return this.mailService.mailcheck(body)
  }

  @Post("/test")
  test(){
    return this.mailService.getMail("ssdgf1101@gmail.com")
  }
}
