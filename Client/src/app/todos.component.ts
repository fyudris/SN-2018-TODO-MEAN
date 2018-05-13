
import { Component, OnInit } from '@angular/core';
import {ToDoService} from './services/todo.service'
import {ToDo} from './ToDo'

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class ToDosComponent implements OnInit{
  // title = 'My ToDoList App';
  todos: ToDo[];

  constructor(private _todoService: ToDoService) {}

  ngOnInit() {
    this.todos = [];
    this._todoService.getToDos().subscribe(todos => {
      this.todos = todos;
      console.log(todos);
    });
  }


  // ADD NEW TODO
  addTodo(event, todoTitle, todoDate) {
    var result;
    var newTodo = {
      title: todoTitle.value,
      date: todoDate.value.toString(),
      isCompleted: false
    };
    result = this._todoService.saveTodo(newTodo);
    result.subscribe(x => {this.todos.push(newTodo);
    todoTitle.value = ''});
  }

  completeTodo(todo){
    if(todo.isCompleted){

    }
  }

  // ENTER EDIT STATE
  setEditState(todo, state) {
    if(state){
      todo.isEditMode = state;
    }else {
      delete todo.isEditMode;
    }
  }


  // UPDATE A TODO COMPLETE STATUS (CHECKED/UNCHECKED)
  updateStatus(todo) {
    var _todo = {
    _id : todo._id,
    title: todo.title,
    date: todo.date,
    isCompleted: !todo.isCompleted
    };
    this._todoService.updateTodo(_todo).subscribe(data => {
      todo.isCompleted = !todo.isCompleted;
    });
  }

  //
  // // EDIT A TODO
  // updateTodoText(event, todo) {
  //   if(event.which === 13){
  //     todo.text = event.target.value;
  //     var _todo =  {
  //       _id: todo._id,
  //       text: todo.text,
  //       isCompleted: todo.isCompleted
  //     };
  //
  //     this._todoService.updateTodo(_todo)
  //     .subscribe(data => {this.setEditState(todo,false);})
  //   }
  // }
  //
  //
  // DELETE A TODO
  deleteTodo(todo){
    var todos = this.todos;

    this._todoService.deleteTodo(todo._id)
    .subscribe(data => {
      if(data.n == 1){
        for(var i = 0; i < todos.length; i++){
          if(todos[i]["_id"] == todo._id){
            todos.splice(i, 1);
          }
        }
      }
    });
  }

}//
