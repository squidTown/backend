import { Module } from '@nestjs/common';
import { TutoringService } from './tutoring.service';
import { TutoringController } from './tutoring.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutoring } from 'src/domain/tutoring.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from "path"
import { AuthModule } from 'src/auth/auth.module';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/domain/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Tutoring,User]),AuthModule,
  MulterModule.register({
    storage: diskStorage({
      destination: (req, file, cb) => {
        const e = path.join(`${__dirname}`,"..","..","..",`/img`)
      //  console.log( path.join(`${__dirname}`,"..","..",`/uploads`))
        //console.log("Upload directory:", path.join(__dirname, '..', '/uploads'));

        cb(null,e/* "C:/studynest/JBWvideo/uploads"*/ /*path.join(`${__dirname}`,"..",`/uploads`)*/); // uploads 디렉토리로 저장
      },
      filename: (req, file, cb) => {
        const uniqueFileName = `${uuidv4()}-${file.originalname}`;
        cb(null,uniqueFileName) // 파일명은 업로드된 원래 파일명 사용
      },
    }), 
    fileFilter(req, file, cb) {
      if(file.mimetype =="image/png"){
        console.log(file)
        cb(null,true)
      }
      cb(null,false)
    },
  })

],
  controllers: [TutoringController],
  providers: [TutoringService],
})
export class TutoringModule {}


/*
채팅기능 과외 학원 등록기는ㅇ 사진은 base 64 형태로 저장 
그리고 음 
소켓
사진등록 완료
설명
만든사람이름
번호
사진
소개
질문
댓글 





*/