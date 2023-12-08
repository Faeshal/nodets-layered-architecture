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
import dayjs from "dayjs";

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

  @OneToOne(() => User, (user: any) => user.profile)
  user: User;
}
