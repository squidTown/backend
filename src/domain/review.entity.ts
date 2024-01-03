import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({schema : "cst", name : "review"})
export class Review {
  
  @PrimaryGeneratedColumn("uuid",{name : "reviewId"})
  reviewId : string

  @Column({ type: 'varchar', length: '8', name: 'rName', })//유저이름
  rName : string /// 쓴새끼

  @Column({name : "PostId", type : "text"})
  PostId : string //게시물 id

  @Column({name : "text", type : "varchar", length : "200"})
  text : string;

  @Column({name : "star", type : "int"})
  star : number;

  @ManyToOne(()=>User,(user)=>user.userId,{onDelete : "CASCADE"})
  userId : User | string

}
