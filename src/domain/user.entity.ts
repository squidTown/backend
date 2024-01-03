import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tutoring } from "./tutoring.entity";
import { Academy } from "./academy.entity";
import { Review } from "./review.entity";

@Entity({schema : "cst", name : "user"})
export class User {
  @PrimaryGeneratedColumn("uuid",{name : "userId"})
  userId : string;

  @Column({ type: 'varchar', length: '225', name: 'email',unique : true})
  email: string //이메일 이메일로 로그인 합니다 

  @Column({ type: 'varchar', length: '225', name: 'password' })
  password: string //비밀번호 8이상 20이하

  @Column({ type: 'varchar', length: '225', name: 'name', unique : true })//유저이름
  name: string;

  @Column({ type: "datetime", name: 'birth' })
  birth: Date; //출생년도

  @Column({ type: "int", name: 'sex' })//1이면 남자  2==여자
  sex: number //성별

  @Column({type : "varchar", length : "100", name : " addressName"})//주소이름
  addressName : string;

  @Column({type : "float",name : "let"})//위도 
  let : number;

  @Column({type : "float", name : "lnt"})//경도
  lnt : number;

  @OneToMany(()=>Tutoring, (tutoring)=>tutoring.userId,{cascade : true})
  tutoring : Tutoring | string;

  @OneToMany(()=>Academy,(academy)=>academy.userId,{cascade : true})
  academy : Academy[]

  @OneToMany(()=>Review,(review)=>review.userId,{cascade : true})
  review : Review | string
}
