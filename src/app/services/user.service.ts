import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { environment } from 'src/environments/environment';
import { User } from '../models';
import { Observable } from 'rxjs';

const httpOptionss = new HttpHeaders({
    'Content-Type': 'application/json'
  });

@Injectable({ providedIn: 'root' })
export class UserService {

    token:any;
    
    constructor(private http: HttpClient) { 
        this.token = localStorage.getItem("token");
        httpOptionss.append('Authorization','Bearer '+ this.token);	
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    deleteTodoList(body) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
            });
            return this.http.post(
            `${environment.apiUrl}/todoList/deleteTodoList`,
            JSON.stringify(body), {headers, observe: 'response', responseType: 'text'}
            );
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/api/auth/signup`, user);
    }

    createTodoList(body) {
        var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
        });
        return this.http.post(
        `${environment.apiUrl}/todoList/createTodoList`,
        JSON.stringify(body), {headers, observe: 'response', responseType: 'text'}
        );
    }

    getTasks(id){
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.get(
            `${environment.apiUrl}/todo/getAllTodos?todoListId=` + id, {headers}
          );
    }

    createTask(body) {
        var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
        });
        return this.http.post(
        `${environment.apiUrl}/todo/createTodo`,
        JSON.stringify(body), {headers, observe: 'response', responseType: 'text'}
        );
    }

    deleteTask(body) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
            });
            return this.http.post(
            `${environment.apiUrl}/todo/deleteTodo`,
            JSON.stringify(body), {headers, observe: 'response', responseType: 'text'}
            );
    }

    getTodoLists(){
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          });
        return this.http.get(
            `${environment.apiUrl}/todoList/getAllTodoLists`, {headers}
          );
    }

    
    updateTask(body): Observable<any> {
        var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
        });
        return this.http.post(
        `${environment.apiUrl}/todo/changeStatus`,
        JSON.stringify(body), {headers, observe: 'response', responseType: 'text'}
        );
    }
}