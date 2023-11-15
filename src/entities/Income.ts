import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, DeleteDateColumn } from "typeorm"
import { User } from "./User"
import { Category } from "./Category"

@Entity()
export class Income extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    value: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => User, (user) => user.incomes)
    user: User

    @ManyToMany(() => Category, (category: any) => category.incomes)
    @JoinTable()
    categories: Category[]
}
