/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/Create-todo.dto';
import { ITodos } from './interfaces/ITodos';
import { UpdateTodoDto } from './dto/Update-todo.dto';

@Injectable()
export class TodosService {
  todos: ITodos[] = [
    {
      id: 1,
      title: 'todos app',
      description: 'Create NestJS todo app',
      done: false,
    },
    {
      id: 2,
      title: 'bread',
      description: 'buy bread',
      done: false,
    },
    {
      id: 3,
      title: 'Code app',
      description: 'create app for lawyer',
      done: true,
    },
  ];

  findAll(): ITodos[] {
    return this.todos;
  }

  create(todo: CreateTodoDto) {
    this.todos = [...this.todos, todo as ITodos];
    return 'todo ajouter';
  }

  findOneById(id: string) {
    return this.todos.find((todo) => todo.id === +id);
  }

  delete(id: string) {
    const todoToDeleteIndex = this.todos.findIndex(todo => todo.id === +id)
    if(todoToDeleteIndex !== -1 ) {
      this.todos.splice(todoToDeleteIndex,1)
      return 'todo delete'
    }
    return 'aucun todo ne correspond'
  }

  update(id: string, newTodoAfterUpdate: UpdateTodoDto) {
    const updateTodo = this.todos.find((todo) => todo.id === +id);
    if(!updateTodo) {
      return new NotFoundException('booo did you find this todo')
    }
    if(newTodoAfterUpdate.hasOwnProperty('done')) {
      updateTodo.done = newTodoAfterUpdate.done
    }
    if(newTodoAfterUpdate.title) {
      updateTodo.title = newTodoAfterUpdate.title      
    }
    if(newTodoAfterUpdate.description) {
      updateTodo.description = newTodoAfterUpdate.description      
    }

    const newUpdate = this.todos.map(t => t.id !== +id ? t : updateTodo)

    this.todos = [...newUpdate]

    return {newUpdate: 1, newTodoAfterUpdate: updateTodo};
  }
  
}
