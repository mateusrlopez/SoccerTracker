import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthServiceImplementation } from './auth.service';

export const JwtServiceProvider: Provider = {
    provide: 'JWT_SERVICE',
    useExisting: JwtService,
};

export const AuthServiceProvider: Provider = {
    provide: 'AUTH_SERVICE',
    useClass: AuthServiceImplementation,
};
