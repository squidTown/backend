import { Exclude, Type } from "class-transformer"
import { IsArray, IsNumber, IsString, Max, Min, ValidateNested } from "class-validator"
import { ManyToOne } from "typeorm"

class classdto{
  @IsString()
  academySubject : string

  @IsNumber()
  academyPrice : number

  @IsString()
  academyData : string
}

export class CreateAcademyDto {

  @IsString()
  academyName : string

  //////////////////////
  @Exclude()
  academyPrice : string//db에 json.stringify해서 넣는 거 

  @Exclude()
  academyId : string

  @Exclude()
  name : string//게시자 이름

  @IsString()
  Personnel : string//인원

  @IsArray()
  @IsString({each : true})
  subject : string[]//과목

  @IsString()
  purpose : string//목적

  @IsArray()
  @ValidateNested({each : true, message : "z"})
  @Type(() =>classdto)
  ArrayacademyPrice : classdto[]

  @IsString()
  address : string

  @IsNumber()
  @Min(-90)
  @Max(90)
  Latitude : number

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude : number
  
  @IsString()
  academyInfo : string//학원소개

  @IsArray()
  @IsString({each : true})
  sns : string[];

  @Exclude()
  userId : string

  @Exclude()
  img : string

}
