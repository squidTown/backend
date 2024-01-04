import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Response,Request } from 'express';
import { CreateSendDto } from './dto/create-send.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/create")
  create(@Body() createChatDto: CreateChatDto,@Req() req : Request, @Res() res : Response) {
    return this.chatService.create(createChatDto,req,res);
  }

  @Post("/send")
  send(@Body() createSendDto : CreateSendDto,@Req() req : Request, @Res() res : Response){
    return this.chatService.sendMessage(req,res,createSendDto)
  }

  @Get("/roomFindAll")
  roomFindAll(@Req() req : Request, @Res() res : Response){
    return this.chatService.roomFindAll(req,res)
  }

  @Get("/messageFindAll/:id")
  messageFindAll(@Param("id") id : string,@Req() req : Request, @Res() res : Response){
    return this.chatService.messageFindAll(id,req,res)
  }

  @Get("/newMessageFind/:id")
  newMessageFind(@Param("id") id : string,@Req() req : Request, @Res() res : Response){
    return this.chatService.newMessageFind(id,req,res)
  }
}
