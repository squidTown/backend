import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AcademyService } from './academy.service';
import { CreateAcademyDto } from './dto/create-academy.dto';
import { UpdateAcademyDto } from './dto/update-academy.dto';
import { Request,Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('academy')
export class AcademyController {
  constructor(private readonly academyService: AcademyService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  create(@Body() createAcademyDto: CreateAcademyDto,@Req() req : Request, @Res() res : Response) {
    console.log(createAcademyDto)
    return this.academyService.create(createAcademyDto,req,res);
  }

  @Post("/uploads/:id")//썸네일 생성밑수정 썸네일을 삭제 할 수 는 엄 서 요 
  @UseGuards(JwtAuthGuard   )
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File,@Res() res : Response,@Req() req : Request,@Param("id") id : string) {
    console.log("filename",file.filename)
    await this.academyService.imgSave(file,id,req,res)
  }

  @Get("/findall")
  findAll(@Req() req : Request, @Res() res : Response) {
    return this.academyService.findAll(req,res);
  }

  @Get(':id')//상세보기페이지
  async findOne(@Param('id') id: string,@Req() req : Request, @Res() res : Response) {
    return await this.academyService.findOne(id,req,res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcademyDto: UpdateAcademyDto,@Req() req : Request, @Res() res : Response) {
    return this.academyService.update(id, updateAcademyDto,req,res);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Req() req : Request, @Res() res : Response) {
    return this.academyService.remove(id,req,res);
  }
}

