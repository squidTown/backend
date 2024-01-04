// room.entity.ts

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ schema: "cst", name: "room" })
export class Room {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ name: "roomName", type : "text"})
  roomName: string;

  @Column({ type: 'varchar', length: '225', name: 'host'})//유저이름
  host: string;

  @Column({ type: 'varchar', length: '225', name: 'guest'})//유저이름
  guest: string;

  @Column({name : "senduserName", type : "text"})
  senduserName : string

  @Column({name : "receiveuserName", type : "text"})
  receiveuserName : string

  
}
