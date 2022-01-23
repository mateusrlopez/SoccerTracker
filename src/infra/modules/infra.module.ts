import { Global, Module } from '@nestjs/common';

import { InfrastructureProviders } from '@infra/providers/infra.providers';

@Global()
@Module({
    exports: [...InfrastructureProviders],
    providers: [...InfrastructureProviders],
})
export class InfrastructureModule {}
