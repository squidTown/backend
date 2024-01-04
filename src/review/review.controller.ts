import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Request,Response } from 'express';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post("/create")
  async create(@Body() createReviewDto: CreateReviewDto,@Req() req : Request, @Res() res : Response) {
    return await this.reviewService.create(createReviewDto,req,res);
  }

  @Get(":id")
  async findAll(@Param('id') id: string,@Req() req : Request, @Res() res : Response) {
    return await this.reviewService.findOne(id,req,res);
  } 
  
  @Get('findAll/:id')
  async findOne(@Param('id') id: string,@Req() req : Request, @Res() res : Response) {
    return await this.reviewService.findAll(id,req,res);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto,@Req() req : Request, @Res() res : Response) {
    return await this.reviewService.update(id, updateReviewDto,req,res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Req() req : Request, @Res() res : Response) {
    return await this.reviewService.remove(id,req,res);
  }
}
