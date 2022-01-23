import { Module } from '@nestjs/common';

import { StadiumProviders } from '@infra/providers/stadium.providers';

@Module({
    controllers: [],
    providers: [...StadiumProviders],
})
export class StadiumModule {}
