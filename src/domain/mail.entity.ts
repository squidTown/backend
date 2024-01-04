import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema : "cst", name : "mail"})
export class Mail {
  @PrimaryGeneratedColumn({name : "id", type : "int"})
  id: number;

  @Column({name : "email", type : "varchar", length : "225"})
  email: string;

  @Column({name : "token",type : "int"})
  token: number;

  @Column({name : "expiresAt", type : "datetime"})
  expiresAt: Date;

  @Column({ name : "isVerified",type : "boolean",default: false })
  isVerified: boolean;

  

}
