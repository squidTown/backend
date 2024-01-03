import { IsEmail, IsString, Length } from "class-validator";

export class CreateAuthDto {
  
  @IsEmail()
  @Length(1,225)
  email : string;

  @IsString()
  @Length(8,20)
  password : string;

}
