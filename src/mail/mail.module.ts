import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from 'src/domain/mail.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from 'src/domain/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mail,User]),ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
           user: "bimilbimil613@gmail.com",
          pass: "yctxnyxvmqmhcwlf",
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
     
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports : [MailService]
})
export class MailModule {}
