import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, DeleteDateColumn } from "typeorm"
import { Income } from "./Income";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tag: string

    @CreateDateColumn({ precision: 0 })
    createdAt: Date;

    @UpdateDateColumn({ precision: 0 })
    updatedAt: Date;

    @DeleteDateColumn({ precision: 0 })
    deletedAt: Date

    @ManyToMany(() => Income, (income: any) => income.categories)
    incomes: Income[]
}
