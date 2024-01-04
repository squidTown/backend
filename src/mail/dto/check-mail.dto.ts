import { IsEmail, IsNumber, IsString, Length, Max, Min } from "class-validator";

export class CheckMailDto{
  @IsEmail()
  email : string;

  @IsNumber()
  @Min(1000)
  @Max(9999)
  token : number

}