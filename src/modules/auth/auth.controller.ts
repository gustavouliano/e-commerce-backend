import { Body, Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginUseCase } from './use-cases/login.use-case';
import { RegisterUseCase } from './use-cases/register.use-case';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject() private loginUseCase: LoginUseCase,
        @Inject() private registerUseCase: RegisterUseCase,
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req) {
        return this.loginUseCase.execute(req.user);
    }

    @Post('register')
    async register(@Body() registerBody: CreateUserDto) {
        return await this.registerUseCase.execute(registerBody);
    }
}
