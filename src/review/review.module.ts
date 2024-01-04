import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Academy } from 'src/domain/academy.entity';
import { Review } from 'src/domain/review.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/domain/user.entity';
import { Tutoring } from 'src/domain/tutoring.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Academy,Review,User,Tutoring]),AuthModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
