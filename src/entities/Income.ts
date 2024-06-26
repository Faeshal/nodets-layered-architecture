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
import dateFmt from "../utils/dateFmt";

@Entity()
export class Income {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  value: number;

  @CreateDateColumn({ precision: 0, transformer: dateFmt })
  createdAt: Date;

  @UpdateDateColumn({ precision: 0, transformer: dateFmt })
  updatedAt: Date;

  @DeleteDateColumn({ precision: 0 })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.incomes)
  user: User;

  @ManyToMany(() => Category, (category: any) => category.incomes)
  @JoinTable()
  categories: Category[];
}
