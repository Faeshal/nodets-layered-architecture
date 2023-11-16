import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, DeleteDateColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string

    @Column()
    gender: string

    @Column()
    age: number

    @Column()
    job: string

    @CreateDateColumn({ precision: 0 })
    createdAt: Date;

    @UpdateDateColumn({ precision: 0 })
    updatedAt: Date;

    @DeleteDateColumn({ precision: 0 })
    deletedAt: Date

    @OneToOne(() => User, (user: any) => user.profile)
    user: User
}
