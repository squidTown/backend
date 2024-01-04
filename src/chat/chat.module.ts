import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/domain/room.entity';
import { Chat } from 'src/domain/chat.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/domain/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Room,Chat,User]),AuthModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
