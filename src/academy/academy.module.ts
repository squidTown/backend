import { Module } from '@nestjs/common';
import { AcademyService } from './academy.service';
import { AcademyController } from './academy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Academy } from 'src/domain/academy.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/domain/user.entity';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports : [TypeOrmModule.forFeature([Academy,User]),AuthModule,
  MulterModule.register({
    storage: diskStorage({
      destination: (req, file, cb) => {
        const e = path.join(`${__dirname}`,"..","..","..",`/img`)

        cb(null,e); // uploads 디렉토리로 저장
      },
      filename: (req, file, cb) => {
        const uniqueFileName = `${uuidv4()}-${file.originalname}`;
        cb(null,uniqueFileName) // 파일명은 업로드된 원래 파일명 사용
      },
    }),
    fileFilter(req, file, cb) {
      console.log(file.mimetype)
      if(file.mimetype =="image/png"){
        cb(null,true)

      }
      cb(null,false)
    },
  }),
  ],
  controllers: [AcademyController],
  providers: [AcademyService],
})
export class AcademyModule {}
