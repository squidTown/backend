import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm.config';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { NotFoundMiddleware } from './error/notFoundMiddleware';
import { TutoringModule } from './tutoring/tutoring.module';
import { Tutoring } from './domain/tutoring.entity';
import { AcademyModule } from './academy/academy.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [UserModule,
    TypeOrmModule.forRootAsync({useFactory : ormConfig}),
    MailModule, AuthModule,TutoringModule,
    PassportModule.register({defaultStrategy : "jwt"}),
    JwtModule.register({
      secret : "secret",
      signOptions : {expiresIn : "3000s"}}),
    TutoringModule,
    AcademyModule,
    ReviewModule
  ],

})
export class AppModule {/*
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NotFoundMiddleware).forRoutes({
      path: '*', // 모든 경로에 대해 이 미들웨어를 사용하려면 '*'를 사용
      method: RequestMethod.ALL, // 모든 HTTP 메서드에 대해 적용
    });
  }*/
}
//npm i cookie-parser @types/cookie-parser
//npm install class-transformer
//npm install class-validator  
//npm i @nestjs/jwt
//npm @nestjs/typeorm typeorm mysql2
//npm i @types/nodemailer nodemailer