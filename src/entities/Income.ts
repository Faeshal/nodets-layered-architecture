import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";
import dayjs from "dayjs";

@Entity()
export class Income {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  value: number;

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

  @ManyToOne(() => User, (user) => user.incomes)
  user: User;

  @ManyToMany(() => Category, (category: any) => category.incomes)
  @JoinTable()
  categories: Category[];
}
