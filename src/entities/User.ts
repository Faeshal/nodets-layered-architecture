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
import dayjs from "dayjs";

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

  @CreateDateColumn({
    precision: 0,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        const date = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
        return date;
      },
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    precision: 0,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        const date = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
        return date;
      },
    },
  })
  updatedAt: Date;

  @DeleteDateColumn({
    precision: 0,
  })
  deletedAt: Date;

  @OneToMany(() => Income, (income: any) => income.user)
  incomes: Income[];

  @OneToOne(() => Profile, (profile: any) => profile.user, {
    cascade: ["insert"],
  })
  @JoinColumn()
  profile: Profile;
}
