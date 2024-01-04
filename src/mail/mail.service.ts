import { Injectable,ConflictException} from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Mail } from 'src/domain/mail.entity';
import { LessThan, Repository } from 'typeorm';
import { Interval,Timeout,Cron } from '@nestjs/schedule';
import { CheckMailDto } from './dto/check-mail.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(Mail)
    private mail : Repository<Mail>
    ) {}

  async sendHello(createMailDto : CreateMailDto) {
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;//난수생성
    const {email} = createMailDto
    await this.mailerService
      .sendMail({
        to: `${email}`,
        from: 'bimilbimil613@gmail.com',
        subject: '인증번호를 보내요',//제목
        text: 'Hello World',//내용
        html: `<b>${randomNumber}</b>`,
      })
      .then(async(result) => {
        if(await this.findOne(email)==true){
          await this.remove(email)
        }

        console.log("전송완료");
        const currentTime = new Date(); // 현재 시간
        const fiveMinutesLater = new Date(currentTime.getTime() + 5 * 60000); // 5분(5 * 60000 밀리초) 후의 시간]

        createMailDto.token = randomNumber;
        createMailDto.expiresAt = fiveMinutesLater;
        createMailDto.id = randomNumber;
        await this.mail.save(createMailDto)
        return true;
      })
      .catch((error) => {
        new ConflictException(error);
      });
  }

  @Interval(1000000) // 매 시간마다 실행 (이 시간은 조정 가능)
  async removeExpiredTokens() {
    const currentTime = new Date();
    await this.mail.delete({ expiresAt: LessThan(currentTime) });
  }

  async findOne(email: string) {//없으면 false 있으면 true
    const data = await this.mail.findOne({where : {email}})
    if(!data){
      return false
    }
    return true
  }

  async remove(email: string) {
    const find = this.findOne(email)
    if(!find){
      return {remove : "삭제 대상없음"}
    }
    const data = await this.mail.findOne({where : {email}})
    await this.mail.remove(data)
    return {remove : true}
  }

  async mailcheck(checkMailDto : CheckMailDto){
    const {email,token} = checkMailDto
    const currentDate = new Date();
    const newDate = new Date(currentDate.getTime() + 10 * 60 * 1000);
    if(await this.findOne(email)==false){
      return {success : "인증번호부터보내주세요"}
    }
    const data = await this.mail.findOne({where : {email}})
    console.log(data.token,"토큰입니다")
    if(data.token != token){
      return {success : "인증번호가 맞지 않습니다"}
    }
    data.isVerified = true
    data.expiresAt = newDate
    await this.mail.save(data)
    return {success : true}
  }

  async getMail(email : string){
    const data = await this.mail.findOne({where : {email}})
    console.log("mail :", data)
    if(!data){
      return
    }
    return data
  }
}
