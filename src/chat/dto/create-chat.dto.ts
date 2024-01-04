import { Exclude } from "class-transformer";
import { IsArray, IsString } from "class-validator";

export class CreateChatDto {

  @Exclude()
  host: string;

  @IsString()
  guest: string;

  @Exclude()
  roomName : string

  @Exclude()
  senduserName : string

  @IsString()
  receiveuserName : string

}
