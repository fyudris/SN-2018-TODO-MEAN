import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ToDoService {
    constructor(private _http:Http) {

    }

    // GET ALL TODOS
    getToDos(){
        return this._http.get('/api/v1/todos').pipe(map(res => res.json()));
    }

    // SAVE A NEW TODO TO THE DATABASE
    saveTodo(todo) {
    console.log(todo);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/todo', JSON.stringify(todo),{headers: headers}).pipe(map(res => res.json()));
    }

    // UPDATE A TODO
    updateTodo(todo){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/todo/'+todo._id, JSON.stringify(todo), {headers: headers}).pipe(map(res => res.json()));
    }

    // DELETE A TODO
    deleteTodo(id) {
        return this._http.delete('/api/v1/todo/'+id)
        .pipe(map(res => res.json()));
    }

}
