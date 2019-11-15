import { Component, OnInit } from '@angular/core';
import { UserService,AuthenticationService } from '../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from "@angular/common/http";
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service : UserService, private authservice: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,private calendar: NgbCalendar) {
    this.getTodoLists();
  }

  projectForm: FormGroup;
  taskForm: FormGroup;

  model: NgbDateStruct;
  date: {year: number, month: number};

  selectedTask:any;
  todolists:any;
  tasks = [];
  progress = [];
  completed = [];

  ngOnInit() {
    
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      relatedtask: ['', Validators.required],
      enddate: ['', Validators.required],
    });
  }

  getTodoLists(){
    this.selectedTask = null;
    this.service.getTodoLists().subscribe(
      res => {
        console.log(res)
        this.todolists = res;
      },
      err => {
        console.error(err);
      })
  }

  todos:any;
  todoId:any;
  selectTodo(id){
    this.tasks = [];
    this.progress = [];
    this.completed = [];
    this.todoId = id;
    this.service.getTasks(id).subscribe(
      res => {
        console.log(res);
        this.todos = res;
        console.log(this.todos)
        for (let i = 0; i < this.todos.length; i++) {
          if(this.todos[i].status == "task") this.tasks.push(this.todos[i]);
          else if(this.todos[i].status == "progress") this.progress.push(this.todos[i]);
          else if(this.todos[i].status == "completed") this.completed.push(this.todos[i]);
        }
      },
      err => {
        console.error(err);
      })
  }

  updateTask(newStatus){
    let body = {
      todoId:this.selectedTask.id,
      status:newStatus
    }
    return this.service.updateTask(body).subscribe(
      res => {
        console.log(res);
        this.selectTodo(this.todoId);
      }, err => {
        console.error(err);
      }
    );
  }
  
  get f() { return this.projectForm.controls; }
  
  createTodoList(){
    let body = {
      todoListName: this.f.name.value
    }
    return this.service.createTodoList(body).subscribe(
      res => {
        console.log(res);
        this.getTodoLists();
      }, err => {
        console.error(err);
      }
    );
  }

  deleteTodoList(){
    let body = {
      todoListId: this.todoId
    }
    return this.service.deleteTodoList(body).subscribe(
      res => {
        console.log(res);
        this.getTodoLists();
      }, err => {
        console.error(err);
      }
    );
  }

  enddate:any;

  get b() { return this.taskForm.controls; }

  createTask(){
    console.log(this.enddate);
    let d = this.enddate;
    let enddate = d.month+"/"+d.day+"/"+d.year+" 00:00:00"

    let body = {
      name: this.b.name.value,
      description: this.b.description.value,
      relatedTodoId: Number(this.b.relatedtask.value),
      todoListId: this.todoId,
      deadLine: enddate
    }
    return this.service.createTask(body).subscribe(
      res => {
        console.log(res);
        this.selectTodo(this.todoId);
      }, err => {
        console.error(err);
      }
    );
  }

  logout(){
    this.authservice.logout()
  }

  onSelect(task): void {
    this.selectedTask = task;
  }

}
