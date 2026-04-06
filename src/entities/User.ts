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
} from "typeorm";
import { Income } from "./Income";
import { Profile } from "./Profile";
import dateFmt from "../utils/dateFmt";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  username: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar", default: "user" })
  role: string;

  @Column({ type: "varchar" })
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
