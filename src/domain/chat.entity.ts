import { User } from "src/domain/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema: "cst",name : "chat"})
export class Chat {
  @PrimaryGeneratedColumn("uuid")
  uuid : string;

  @Column({name : "roomName",type : "text"})
  roomName : string;

  @Column({name : "message", type : "text"})
  message : string;

  @Column({name : "time", type : "datetime"})
  time : Date; 

  @Column({name : "senduserId", type : "text"})
  senduserId : string

  @Column({name : "receiveuserId", type : "text"})
  receiveuserId : string

  @Column({name : "senduserName", type : "text"})
  senduserName : string

  @Column({name : "receiveuserName", type : "text"})
  receiveuserName : string

  
}
