import { Type } from 'class-transformer';
import { Dayjs } from 'dayjs';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import * as transfomer from '@helpers/transformer.helper';
import { User } from '@user/entities/user.entity';

@Entity()
export class PasswordReset {
    @PrimaryColumn()
    public email: string;

    @Column()
    public token: string;

    @CreateDateColumn({
        name: 'created_at',
        transformer: transfomer.parseTimestamp,
        type: 'timestamptz',
    })
    @Type(() => Date)
    public readonly createdAt: Dayjs;

    @OneToOne(() => User, { eager: true })
    @JoinColumn({ name: 'email', referencedColumnName: 'email' })
    public user: User;
}
