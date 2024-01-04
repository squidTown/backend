import { Exclude } from "class-transformer";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateMailDto {
    @Exclude()
    id: number;

    @IsEmail()
    @Length(1,225)
    email: string;
  
    @Exclude()
    token: number;
  
    @Exclude()
    expiresAt: Date;
  
    @Exclude()
    isVerified: boolean;
  
}