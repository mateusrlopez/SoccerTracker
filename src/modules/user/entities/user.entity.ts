import { Exclude, Expose, Type } from "class-transformer";
import { Dayjs } from "dayjs";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

import * as date from "@helpers/date.helper";
import * as transformer from "@helpers/transformer.helper";

@Entity()
export class User {
    @PrimaryColumn()
    public readonly id: number;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column({ transformer: transformer.encrypt })
    @Exclude()
    public password: string;

    @Column({ name: "email_verified" })
    public emailVerified: boolean;

    @Column({ transformer: transformer.parseDate, type: "date" })
    @Type(() => Date)
    public birthdate: Dayjs;

    @Column({ name: "photo_url" })
    public photoURL: string | null;

    @Column({ name: "team_id" })
    public teamId: number | null;

    @CreateDateColumn({
        name: "created_at",
        transformer: transformer.parseTimestamp,
        type: "timestamp with time zone",
    })
    @Type(() => Date)
    public readonly createdAt: Dayjs;

    @UpdateDateColumn({
        name: "updated_at",
        transformer: transformer.parseTimestamp,
        type: "timestamp with time zone",
    })
    @Type(() => Date)
    public readonly updatedAt: Dayjs;

    @Expose()
    public get age(): number {
        return this.birthdate.diff(date.now(), "years");
    }
}
