import { Injectable } from '@nestjs/common';
import { CreateAcademyDto } from './dto/create-academy.dto';
import { UpdateAcademyDto } from './dto/update-academy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Academy } from 'src/domain/academy.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class AcademyService {

  constructor(
    @InjectRepository(Academy)
    private academy : Repository<Academy>,
    private authService : AuthService
  ){}

  async create(createAcademyDto: CreateAcademyDto, req : Request, res : Response) {
    const verify = await this.authService.verify2(req)
    try{
      createAcademyDto.academyPrice =  JSON.stringify(createAcademyDto.ArrayacademyPrice)
      createAcademyDto.name = verify.name
      createAcademyDto.userId = verify.uuid
      await this.academy.save(createAcademyDto)
      return res.status(200).json({
        message : "완료"
      })
    }catch(error){
      console.log(error)
      res.status(500).json({
        message : "ise"
      })
    }
    
  }

  async imgSave( file: Express.Multer.File,academyId : string, req : Request, res : Response){
    const verify = await this.authService.verify2(req);
    const e = path.join(`${__dirname}`,"..","..","..",`/img`,`${file.filename}`)
    try{
      const academyData = await this.academy.findOne({where : {academyId,userId : verify.uuid}})
      if(!academyData){
        throw ({message : "false",status : 401})
      }
      const imageBuffer = fs.readFileSync(e);
      const base64Image = imageBuffer.toString('base64');
      academyData.img = base64Image
      await fs.unlink(e,(error)=>{
        if(error){
          throw ({message : "false", status : 500})
        }
      })
      await this.academy.save(academyData)
      return res.status(200).json({
        message : "OK"
      })
    }catch(error){
      console.log(error)
      return res.status(error.status).json({message : error.message})
    }
  }

   async findAll(req : Request, res : Response) {
    try{
      const data = await this.academy.find()
      return res.status(200).json({
        message : "성공적으로 완료라고 할 수 있지",
        data : data
      })
    }catch(error){
      console.log(error)
      return res.status(500).json({
        message : "ise"
      })
    }
  }

  async findOne(academyId: string,req : Request, res : Response) {//상세보기페이지 이다
    try{
      const data = await this.academy.findOne({where : {academyId}})
      return res.status(200).json({
        message : "성공",
        data : data
      })
    }catch(error){
      return res.status(500).json({
        message : "ise"
      })
    }
  }

  async update(academyId: string, updateAcademyDto: UpdateAcademyDto,req : Request, res : Response) {
    const verify = await this.authService.verify2(req)
    try{
      const data = await this.academy.findOne({where : {academyId,userId : verify.uuid}})
      if(!data){
        throw ({
          message :  "권한이없습니다"
        })
      }
      if(!updateAcademyDto.ArrayacademyPrice){
        data.academyPrice = "";
      }else{
        data.academyPrice = JSON.stringify(updateAcademyDto.ArrayacademyPrice)
      }
      data.academyName = updateAcademyDto.academyName;
      data.Personnel = updateAcademyDto.Personnel;
      data.subject = updateAcademyDto.subject;
      data.purpose = updateAcademyDto.purpose;
      data.address = updateAcademyDto.address;
      data.Latitude = updateAcademyDto.Latitude;
      data.longitude = updateAcademyDto.longitude;
      data.academyInfo = updateAcademyDto.academyInfo;
      data.sns= updateAcademyDto.sns;
      
      await this.academy.save(data)
      return res.status(200).json({
        message : "OK"
      })

    }catch(error){
      if(error.status = 401){
        return res.status(401).json({message : error.message})
      }
      return res.status(500).json({message : "ise"})
    }
  }

  async remove(academyId : string,req : Request, res : Response) {
    const verify = await this.authService.verify2(req)
    try{
      const data = await this.academy.findOne({where : {academyId,userId : verify.uuid}})
      if(!data){
        throw ({
          message :  "권한이없습니다"
        })
      }
      await this.academy.remove(data)
      return res.status(200).json({
        message : "OK"
      })

    }catch(error){
      if(error.status = 401){
        return res.status(401).json({message : error.message})
      }
      return res.status(500).json({message : "ise"})
    }
  }
}
