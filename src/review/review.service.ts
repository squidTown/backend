import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Request,Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/domain/review.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Academy } from 'src/domain/academy.entity';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository(Review)
    private review : Repository<Review>,
    
    @InjectRepository(Academy)
    private academy : Repository<Academy>,
    
    private authService : AuthService
  ){}

  async create(createReviewDto: CreateReviewDto,req : Request, res : Response) {
    const verify = await this.authService.verify2(req)
    try{
      const aData = await this.academy.findOne({where : {academyId : createReviewDto.PostId}})
      if(!aData){
        return res.status(400).json({
          message : "존재하지않는게시물"
        })
      } 
      createReviewDto.rName = verify.name
      createReviewDto.userId = verify.uuid
      console.log(verify)
      const data = await this.review.save(createReviewDto)
      return res.status(200).json({message :"OK"})
    }catch(error){
      return res.status(500).json({message : "ise"})
    }
  }

  async findOne(reviewId : string,req : Request, res :Response) {
    try{
      const data = await this.review.find({where : {reviewId}})
      return res.status(200).json({
        message : "OK",
        review : data
      })
    }catch(error){
      return res.status(500).json({message : "ise"})
    }
  }

  async findAll(PostId : string,req : Request, res :Response) {
    try{
      const data = await this.review.find({where : {PostId}})
      return res.status(200).json({
        message : "OK",
        review : data
      })
    }catch(error){
      return res.status(500).json({message : "ise"})
    }
  }

  async update(reviewId: string, updateReviewDto: UpdateReviewDto,req : Request, res :Response) {
    const verify = await this.authService.verify2(req);
    try{
      console.log(verify.uuid)
      const data = await this.review.findOne({where : {userId : verify.uuid,reviewId}})
      console.log(data,verify.uuid)
      if(!data){
        return res.status(401).json({
          message : "false"
        })
      }
      data.star = updateReviewDto.star;
      data.text = updateReviewDto.text;
      await this.review.save(data)
      return res.status(200).json({message : "ok"})
    }catch(error){
      console.log(error)
      return res.status(500).json({message : "ise"})
    }
  }

  async remove(reviewId: string,req : Request, res :Response) {
    const verify = await this.authService.verify2(req);
    try{
      const data = await this.review.findOne({where : {userId : verify.uuid,reviewId}})
      if(!data){
        return res.status(401).json({message : "false"})
      }
      await this.review.remove(data);
      return res.status(200).json({message : "ok"})
    }catch(error){
      return res.status(500).json({message : "ise"})
    }
  }
}
