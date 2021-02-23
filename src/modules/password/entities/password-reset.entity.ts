import { Type } from "class-transformer";
import { Dayjs } from "dayjs";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

import { User } from "@user/entities/user.entity";

@Entity()
export class PasswordReset {
    @PrimaryColumn()
    public readonly id: number;

    @Column()
    public email: string;

    @Column()
    public token: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
    @Type(() => Date)
    public readonly createdAt: Dayjs;

    @OneToOne(() => User, { eager: true })
    @JoinColumn({ name: "email" })
    public user: User;
}
