import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/domain/room.entity';
import { Repository, MoreThan } from 'typeorm'; // MoreThan import 추가

import { Chat } from 'src/domain/chat.entity';
import { AuthService } from 'src/auth/auth.service';
import { Response,Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/domain/user.entity';
import { CreateSendDto } from './dto/create-send.dto';


@Injectable()
export class ChatService {

  constructor(
    @InjectRepository(Room)
    private room : Repository<Room>,

    @InjectRepository(Chat)
    private chat : Repository<Chat>,

    @InjectRepository(User)
    private user : Repository<User>,

    private authService : AuthService
  ){}

  async create(createChatDto: CreateChatDto,req : Request, res : Response) {
    const verify = await this.authService.verify2(req);
    try{
      createChatDto.host = verify.uuid;
      console.log(createChatDto.guest)
      const userData = await this.user.findOne({where : {userId : createChatDto.guest}})
      console.log(userData)
      if(!userData||verify.uuid==userData.userId){
        return res.status(400).json({message : "존재하지않는유저"})
      }
      const {host,guest} = createChatDto
      createChatDto.senduserName = verify.name
      createChatDto.receiveuserName = userData.name
      createChatDto.roomName = uuidv4();
      console.log(createChatDto)
      const data = await this.room.findOne({where : [
        {host,guest},
        {host : guest, guest : host}
      ]})
      console.log(createChatDto.roomName)
      if(data){
        return res.status(200).json({
          message : "이미방이존재합니다"
        })
      }
      
      await this.room.save(createChatDto)
      
      return res.status(200).json({
        message : "ok"
      })
    }catch(error){
      console.log(error)
    }
  }

  async sendMessage(req : Request, res : Response,createSendDto : CreateSendDto){
    const verify = await this.authService.verify2(req)
    try{
      const {roomName} = createSendDto
      createSendDto.senduserId = verify.uuid
      createSendDto.senduserName = verify.name
      const roomData = await this.room.findOne({where : [{roomName : roomName,host : verify.uuid},
        {roomName : roomName,guest : verify.uuid}
      ]})
      if(!roomData){
        return res.status(400).json({
          message : "존재하지않는방"
        })
      }
      
      if(roomData.guest!=verify.uuid){
        createSendDto.receiveuserId = roomData.guest
        createSendDto.receiveuserName = roomData.receiveuserName
      }else{
        createSendDto.receiveuserId = roomData.host
        createSendDto.receiveuserName = roomData.senduserName
      }
      const now = new Date()
      createSendDto.time = now;
      await this.chat.save(createSendDto)
      return res.status(200).json({message : "완료"})
    }catch(error){
      console.log(error)
      return res.status(500).json({message : "ise"})
    }

  }

  async roomFindAll(req : Request, res : Response){
    const verify = await this.authService.verify2(req)
    try{
      const data = await this.room.find({where : [
        {host : verify.uuid},
        {guest : verify.uuid}
      ]})
      return res.status(200).json({
        message : "",
        data : data
      })
    }catch(error){
      console.log(error)
      return res.status(500).json({message : "ise"})
    }
  }

  async messageFindAll(roomName : string,req : Request, res : Response){
    const verify = await this.authService.verify2(req)
    try{
      const chatData = await this.chat.find({where : [{roomName : roomName,senduserId : verify.uuid},
        {roomName : roomName,receiveuserId : verify.uuid}
      ]})
      return res.status(200).json({data  : chatData})
    }catch(error){
      console.log(error)
      return res.status(500).json({message : "ise"})
    }
  }

  async newMessageFind(roomName : string,req : Request, res : Response){
    const verify = await this.authService.verify2(req)
    try{

      const currentTime = new Date();
      const threeSecondsAgo = new Date(currentTime.getTime() - 3000);
  
      const chatData = await this.chat.find({
        where: [
          { roomName: roomName, senduserId: verify.uuid, time: MoreThan(threeSecondsAgo) },
          { roomName: roomName, receiveuserId: verify.uuid, time: MoreThan(threeSecondsAgo) },
        ],
      });
      return res.status(200).json({data  : chatData})
    }catch(error){
      console.log(error)
      return res.status(500).json({message : "ise"})
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
