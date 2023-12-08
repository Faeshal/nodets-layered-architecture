import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  DeleteDateColumn,
} from "typeorm";
import { Income } from "./Income";
import dayjs from "dayjs";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tag: string;

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

  @ManyToMany(() => Income, (income: any) => income.categories)
  incomes: Income[];
}
