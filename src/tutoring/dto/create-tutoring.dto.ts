import { Exclude } from "class-transformer";
import { IsNumber, IsString, Length } from "class-validator";

export class CreateTutoringDto {
  @Exclude()
  postId : string;

  @Exclude()
  name: string;

  @Exclude()
  img : string;

  @IsString()
  @Length(0,225)
  career : string;

  @IsString()
  @Length(0,225)
  ability : string;

  @IsString()
  introduction :string

  @IsString()
  latitude : number;

  @IsString()
  longitude : number;

  @IsString()
  @Length(1,225)
  address : string;

  @IsString()
  sns : string;

  @IsString()
  money : string;

  @Exclude()
  userId : string

}
