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
import dateFmt from "../utils/dateFmt";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tag: string;

  @CreateDateColumn({ precision: 0, transformer: dateFmt })
  createdAt: Date;

  @UpdateDateColumn({ precision: 0, transformer: dateFmt })
  updatedAt: Date;

  @DeleteDateColumn({ precision: 0 })
  deletedAt: Date;

  @ManyToMany(() => Income, (income: any) => income.categories)
  incomes: Income[];
}
