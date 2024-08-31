import { Body, Controller, Delete, Get, HttpCode, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindUserUseCase } from './use-cases/find-user.use-case';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneUserUseCase } from './use-cases/find-one-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';

@Controller('users')
export class UsersController {
    constructor(
        @Inject() private createUserUseCase: CreateUserUseCase,
        @Inject() private findUserUseCase: FindUserUseCase,
        @Inject() private findOneUserUseCase: FindOneUserUseCase,
        @Inject() private updateUserUseCase: UpdateUserUseCase,
        @Inject() private deleteUserUseCase: DeleteUserUseCase,
    ) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.createUserUseCase.execute(createUserDto);
    }

    @Get()
    find() {
        return this.findUserUseCase.execute();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.findOneUserUseCase.execute(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.updateUserUseCase.execute(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.deleteUserUseCase.execute(id);
    }
}
