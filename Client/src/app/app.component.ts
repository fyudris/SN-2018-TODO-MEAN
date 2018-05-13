import { Component } from '@angular/core';
import {ToDoService} from './services/todo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToDoService]
})
export class AppComponent {
  title = 'My ToDOList App';
}
