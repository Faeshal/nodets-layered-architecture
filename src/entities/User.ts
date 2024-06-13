import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
  DatabaseType,
} from "typeorm";
import { Income } from "./Income";
import { Profile } from "./Profile";
import dateFmt from "../utils/dateFmt";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ default: "user" })
  role: string;

  @Column()
  password: string;

  @CreateDateColumn({ precision: 0, transformer: dateFmt })
  createdAt: Date;

  @UpdateDateColumn({ precision: 0, transformer: dateFmt })
  updatedAt: Date;

  @DeleteDateColumn({ precision: 0 })
  deletedAt: Date;

  @OneToMany(() => Income, (income: any) => income.user)
  incomes: Income[];

  @OneToOne(() => Profile, (profile: any) => profile.user, {
    cascade: ["insert"],
  })
  @JoinColumn()
  profile: Profile;
}
