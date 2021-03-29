import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { IPasswordReset } from '@password-reset/interfaces/password-reset.interface';
import { TransformerHelper } from '@shared/helpers/transformer.helper';
import { User } from '@user/entities/user.entity';

@Entity()
export class PasswordReset implements IPasswordReset {
    @PrimaryColumn()
    public userEmail: string;

    @Column()
    public token: string;

    @CreateDateColumn({
        transformer: TransformerHelper.parseGeneratedTimestamp,
        type: 'timestamptz',
    })
    @Transform(({ value }) => value.toFormat('yyyy-MM-dd HH:mm:ss'))
    public createdAt: DateTime;

    @OneToOne(() => User)
    @JoinColumn({ referencedColumnName: 'email' })
    public user: User;
}
