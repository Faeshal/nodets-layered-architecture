import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn, JoinColumn, OneToOne } from "typeorm"
import { Income } from "./Income"
import { Profile } from "./Profile"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column({ default: "user" })
    role: string

    @Column()
    password: string

    @CreateDateColumn({ precision: 0 })
    createdAt: Date;

    @UpdateDateColumn({ precision: 0 })
    updatedAt: Date;

    @DeleteDateColumn({ precision: 0 })
    deletedAt: Date

    @OneToMany(() => Income, (income: any) => income.user)
    incomes: Income[]

    @OneToOne(() => Profile, (profile: any) => profile.user, { cascade: ['insert'] })
    @JoinColumn()
    profile: Profile
}
