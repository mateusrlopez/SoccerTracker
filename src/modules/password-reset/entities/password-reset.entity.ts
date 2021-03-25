import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { TransformerHelper } from '@shared/helpers/transformer.helper';
import { User } from '@user/entities/user.entity';

@Entity()
export class PasswordReset {
    @PrimaryColumn()
    public userEmail: string;

    @Column()
    public token: string;

    @CreateDateColumn({
        transformer: TransformerHelper.parseGeneratedTimestamp,
        type: 'timestamptz',
    })
    @Transform(({ value }) => value.toFormat('yyyy-MM-dd HH:mm:ss'))
    public readonly createdAt: DateTime;

    @OneToOne(() => User)
    @JoinColumn({ referencedColumnName: 'email' })
    public user: Promise<User>;
}
