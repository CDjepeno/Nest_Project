import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/Create-todo.dto';
import { UpdateTodoDto } from './dto/Update-todo.dto';
import { ITodos } from './interfaces/ITodos';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(readonly todosService: TodosService) {}

  @Get()
  findAll(): ITodos[] {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): ITodos {
    return this.todosService.findOneById(id);
  }

  @Post()
  createTodo(@Body() newTodo: CreateTodoDto): string {
    return this.todosService.create(newTodo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.todosService.delete(id);
  }
}
