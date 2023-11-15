import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, DeleteDateColumn } from "typeorm"
import { Income } from "./Income";

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tag: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToMany(() => Income, (income: any) => income.categories)
    incomes: Income[]
}
