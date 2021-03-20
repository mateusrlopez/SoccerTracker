import { Type } from 'class-transformer';
import { Dayjs } from 'dayjs';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import * as transfomer from '@shared/helpers/transformer.helper';
import { User } from '@user/entities/user.entity';

@Entity()
export class PasswordReset {
    @PrimaryColumn()
    public userEmail: string;

    @Column()
    public token: string;

    @CreateDateColumn({
        transformer: transfomer.parseTimestamp,
        type: 'timestamptz',
    })
    @Type(() => Date)
    public readonly createdAt: Dayjs;

    @OneToOne(() => User)
    @JoinColumn({ referencedColumnName: 'email' })
    public user: Promise<User>;
}
