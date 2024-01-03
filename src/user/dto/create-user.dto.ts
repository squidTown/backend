import { Exclude } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsNumber, IsString, Length, Max, Min } from "class-validator";

export class CreateUserDto {
  @Exclude()
  userId : string;

  @IsEmail()
  @Length(1,225)
  email : string;

  @IsString()
  @Length(8,20)
  password : string;

  @IsString()
  @Length(2,7)
  name : string;

  @IsDateString()
  birth : Date;

  @IsNumber()
  @Min(1)
  @Max(2)
  sex : number;

  @IsString()
  @Length(1,100)
  addressName : string;
  
  @IsNumber()
  let : number;

  @IsNumber()
  lnt : number;
}

