  import { Type } from "class-transformer";
  import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
  import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
  import { User } from "./user.entity";

  @Entity({schema : "cst", name : "academy"})
  export class Academy {
    @PrimaryGeneratedColumn("uuid",{name : "academy"})
    academyId : string;

    @Column({name : "academyName", type  :"varchar", length : "223"})
    academyName : string

    @Column({ type: 'varchar', length: '8', name: 'name', })//유저이름
    name: string;

    @Column({name : "Personnel", type  :"varchar", length : "223"})
    Personnel : string;

    @Column({name : "subject", type : "json",})
    subject : string[];

    @Column({name : "purpose", type : "varchar", length : "223"})
    purpose : string;
    
    @Column({name : "academyPrice", type : "text"})
    academyPrice : string

    @Column({name : "address", type : "varchar", length : "223"})
    address: string;
    
    @Column({name : "latitude", type : "double"})
    Latitude: number;

    @Column({name : "longitude", type : "double"})
    longitude: number;

    @Column({name : "academyInfo", type : "varchar", length : "223"})
    academyInfo: string;

    @Column({name : "sns", type : "json", })
    sns: string[];

    @Column({name : "img", type : "longtext", nullable : true})
    img

    @ManyToOne(()=>User,(user)=>user.userId,{onDelete : "CASCADE"})
    userId : User | string

  }
