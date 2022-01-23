import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { IBaseModel } from '@domain/models/base.model';

export abstract class BaseEntity implements IBaseModel {
    @PrimaryGeneratedColumn('uuid')
    public readonly id?: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    public readonly createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    public readonly updatedAt?: Date;
}
