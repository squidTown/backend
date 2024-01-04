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


  @Post("/uploads/:id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File,@Res() res : Response,@Req() req : Request,@Param("id") id : string) {
  await this.tutoringService.uploads(file,req,res,id);
  }

  @Post("/create")
  create(@Body() createTutoringDto : CreateTutoringDto,@Res() res : Response,@Req() req : Request){
    return this.tutoringService.create(createTutoringDto,req,res)
  }

  @Get("/findall")
  findAll(@Res() res : Response,@Req() req : Request) {
    return this.tutoringService.findAll(req,res);
  }

  @Get("/findmy")
  findmy(@Res() res : Response,@Req() req : Request) {
    return this.tutoringService.findMy(req,res);
  }
  @Get(':id')
  findOne(@Param('id') id: string,@Res() res : Response,@Req() req : Request) {
    return this.tutoringService.findOne(id,req,res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTutoringDto: UpdateTutoringDto,@Res() res : Response,@Req() req : Request) {
    return this.tutoringService.update(id,updateTutoringDto,req,res);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Res() res : Response,@Req() req : Request) {
    return this.tutoringService.remove(id,req,res);
  }
}
