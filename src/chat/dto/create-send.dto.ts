import { Exclude } from "class-transformer";
import { IsArray, IsString } from "class-validator";

export class CreateSendDto {

  @IsString()
  roomName : string

  @IsString()
  message : string;

  @Exclude()
  time : Date; 

  @Exclude()
  senduserId : string

  @Exclude()
  receiveuserId : string

  @Exclude()
  senduserName : string

  @Exclude()
  receiveuserName : string

}
