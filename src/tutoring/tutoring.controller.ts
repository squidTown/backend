import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile,Res,Req } from '@nestjs/common';
import { TutoringService } from './tutoring.service';
import { CreateTutoringDto } from './dto/create-tutoring.dto';
import { UpdateTutoringDto } from './dto/update-tutoring.dto';
import { JwtAuthGuard } from 'src/auth/auth.jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {Request,Response} from "express"

@Controller('tutoring')
export class TutoringController {
  constructor(private readonly tutoringService: TutoringService) {}


  @Post("/uploads")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File,@Res() res : Response,@Req() req : Request,@Body() createTutoringDto : CreateTutoringDto) {
  await this.tutoringService.uploads(file,createTutoringDto,req,res);

  }

  @Post("/create")
  create(@Body() createTutoringDto: CreateTutoringDto) {
    return this.tutoringService.create(createTutoringDto);
  }

  @Get()
  findAll() {
    return this.tutoringService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutoringService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTutoringDto: UpdateTutoringDto) {
    return this.tutoringService.update(+id, updateTutoringDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutoringService.remove(+id);
  }
}
