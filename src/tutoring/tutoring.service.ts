import { Injectable } from '@nestjs/common';
import { CreateTutoringDto } from './dto/create-tutoring.dto';
import { UpdateTutoringDto } from './dto/update-tutoring.dto';
import {Request,Response} from "express"
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Tutoring } from 'src/domain/tutoring.entity';
import path, { join } from 'path';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { UpdateAcademyDto } from 'src/academy/dto/update-academy.dto';

@Injectable()
export class TutoringService {

  constructor(
    private authService : AuthService,
    @InjectRepository(Tutoring)
    private tutoring : Repository<Tutoring>
  ){}

  //과외 등록 기능
  async uploads(file : Express.Multer.File,req :  Request, res : Response,postId : string){
    const verify = await this.authService.verify2(req);
    try{
      const data = await this.tutoring.findOne({where : {userId : verify.uuid,postId}})
      if(!data){
        return res.status(401).json({})
      }
      const path2 = join(__dirname,"..","..","..","img")
      const path = join(/*'C:/studynest/JBWvideo/uploads'*/path2, `${file.filename}`);
      const imageBuffer =  fs.readFileSync(path);
      const base64Image =  imageBuffer.toString('base64'); 
      data.img = base64Image
      await fs.unlink(path,(error)=>{
        if(error){
          throw ({message : "ise", status : 500})
        }
      })
      await this.tutoring.save(data)
      return res.status(200).json({message : "ok"})
    }catch(error){
      if(error.status == 400){
        return res.status(400).json({message : error.message})
      }

      return res.status(500).json({
        message : "i s e "
      })
    }
  }

  async create(createTutoringDto: CreateTutoringDto,req : Request, res : Response) {
    const verify = await this.authService.verify2(req);
    try{
      createTutoringDto.name = verify.name
      createTutoringDto.userId = verify.uuid
      await this.tutoring.save(createTutoringDto)
      return res.status(200).json({
        message : "완료"
      })  
    }catch(error){
      console.log(error)
      return res.status(500).json({message : "isg"})
    }
  }

  async findAll(req : Request, res : Response) {
    try{
      const data = await this.tutoring.find({select : ["postId","name","address"]})
      return res.status(200).json({message : "OK",
      data : data
    })
    }catch(error){
      console.log(error)
      return res.status(500).json({message :" ise"})
    }
  }

  async findOne(postId : string,req : Request, res : Response) {//상세보기
    try{
      const data = await this.tutoring.findOne({where : {postId}})
      return res.status(200).json({message : "ok", data : data})
    }catch(error){
      return res.status(500).json({message :" ise"})
    }
  }

  async findMy(req : Request, res : Response){
    const verify = await this.authService.verify2(req);
    try{
      const data = await this.tutoring.find({where : {userId : verify.uuid},select : ["postId","name","address"]})
      return res.status(200).json({
        data : data
      })
    }catch(error){
      console.log(error)
      return res.status(500).json({message:"ise"})
    }
  }

  async update(postId: string, updateTutoringDto: UpdateTutoringDto,req : Request, res : Response) {
    const verify = await this.authService.verify2(req);
    try{
      const data = await this.tutoring.findOne({where : {postId,userId : verify.uuid}})
      if(!data){
        return res.status(404).json({message : "그런거없습니다"})
      }
      data.ability = updateTutoringDto.ability
      data.address = updateTutoringDto.address
      data.career = updateTutoringDto.career
      data.introduction = updateTutoringDto.introduction
      data.latitude = updateTutoringDto.latitude
      data.longitude = updateTutoringDto.longitude
      data.money = updateTutoringDto.money
      data.sns = updateTutoringDto.sns
      await this.tutoring.save(data);
      return res.status(200).json({message : "ok"})
    }catch(error){
      console.log(error)
      return res.status(200).json({message : "ise"})
    }

  }

  async remove(postId : string, req : Request, res : Response) {
    const verify = await this.authService.verify2(req);
    try{
      const data = await this.tutoring.findOne({where : {postId,userId : verify.uuid}})
      if(!data){
        return res.status(401).json({})
      }
      await this.tutoring.remove(data);
      return res.status(200).json({message : "ok"})
    }catch(error){
      console.log(error)
      return res.status(500).json({message : "ise"})
    }
  }


}
