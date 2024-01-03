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

@Injectable()
export class TutoringService {

  constructor(
    private authService : AuthService,
    @InjectRepository(Tutoring)
    private tutoring : Repository<Tutoring>
  ){}

  //과외 등록 기능
  async uploads(file : Express.Multer.File,createTutoringDto : CreateTutoringDto, req :  Request, res : Response,){
    const verify = await this.authService.verify2(req);
    try{
      const cwd = process.cwd()
      const path2 = join(cwd,"..","img")
      const path = join(/*'C:/studynest/JBWvideo/uploads'*/path2, `${file.filename}`);
      const imageBuffer =  fs.readFileSync(path);
      const base64Image =  imageBuffer.toString('base64'); 
     createTutoringDto.img =  base64Image;
      createTutoringDto.name = verify.name
      createTutoringDto.userId = verify.uuid
      const latitude = Number(createTutoringDto.latitude) 
      const longitude = Number(createTutoringDto.longitude) 

      fs.unlink(path,(error)=>{
        if(error){
          throw ({message : "ise", status : 500})
        }else{
          return res.status(200).json({
            message : "성공적으로 완료"
          })
        }
      })

      if(longitude >=90&&longitude <=90 || latitude >= -180 || latitude <=180){

      await this.tutoring.save(createTutoringDto)
      return res.status(201).json({
        message : "완료"
      })  
      }
      throw ({message : "잘못된요청값", status : 400})
 
    }catch(error){
      if(error.status == 400){
        return res.status(400).json({message : error.message})
      }

      return res.status(500).json({
        message : "i s e "
      })
    }
  }

  create(createTutoringDto: CreateTutoringDto) {
    return 'This action adds a new tutoring';
  }

  findAll() {
    return `This action returns all tutoring`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tutoring`;
  }

  update(id: number, updateTutoringDto: UpdateTutoringDto) {
    return `This action updates a #${id} tutoring`;
  }

  remove(id: number) {
    return `This action removes a #${id} tutoring`;
  }
}
