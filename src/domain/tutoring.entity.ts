import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({schema : "cst", name : "tutoring"})
export class Tutoring {
  @PrimaryGeneratedColumn("uuid",{name : "postId"})
  postId : string;

  @Column({ type: 'varchar', length: '225', name: 'name'})//유저이름
  name: string;

  @Column({type : "text", name : "img"})
  img : string;

  @Column({type : "text", name : "introduction"})
  introduction : string;

  @Column({type : "varchar", name : "career", length : "225"})//경력
  career : string;

  @Column({type : "varchar", name : "ability", length : "225"})
  ability : string;

  @Column({type : "double", name : "latitude"})//위도
  latitude : number;

  @Column({type : "double", name : " longitude"})//위도
  longitude : number;

  @Column({type : "varchar", name : "address", length : "225"})//상세주소
  address : string;

  @Column({type : "text", name : "sns",})
  sns : string;

  @Column({type : "text", name : "money"})
  money : string;

  @ManyToOne(()=>User, (user)=>user.userId,{onDelete : "CASCADE"})
  userId : User | string
}
