import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  DeleteDateColumn,
} from "typeorm";
import { User } from "./User";
import dateFmt from "../utils/dateFmt";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column()
  job: string;

  @CreateDateColumn({ precision: 0, transformer: dateFmt })
  createdAt: Date;

  @UpdateDateColumn({ precision: 0, transformer: dateFmt })
  updatedAt: Date;

  @DeleteDateColumn({ precision: 0 })
  deletedAt: Date;

  @OneToOne(() => User, (user: any) => user.profile)
  user: User;
}
