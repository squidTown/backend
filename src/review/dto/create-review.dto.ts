import { Exclude } from "class-transformer";
import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
  @Exclude()
  reviewId : string

  @Exclude()
  rName : string /// 쓴새끼

  @Exclude()
  userId : string;

  @IsString({message : "id"})
  PostId : string //게시물 id

  @IsString({message : "text"})
  text : string;

  @IsInt({message : "int"})
  star : number;

}
