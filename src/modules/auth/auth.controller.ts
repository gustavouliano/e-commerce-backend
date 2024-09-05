import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginUseCase } from './use-cases/login.use-case';
import { RegisterUseCase } from './use-cases/register.use-case';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/shared/services/auth/public.decorator';
import { RefreshUseCase } from './use-cases/refresh.use-case';
import { User } from 'src/shared/services/auth/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject() private loginUseCase: LoginUseCase,
        @Inject() private registerUseCase: RegisterUseCase,
        @Inject() private refreshUseCase: RefreshUseCase,
    ) {}

    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@User() user) {
        return this.loginUseCase.execute(user);
    }

    @Post('refresh')
    refresh(@User() user) {
        return this.refreshUseCase.execute(user);
    }

    @Public()
    @Post('register')
    async register(@Body() registerBody: CreateUserDto) {
        return await this.registerUseCase.execute(registerBody);
    }
}
