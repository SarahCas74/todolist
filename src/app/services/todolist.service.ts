import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  backend = 'http://127.0.0.1:5000/todos';

  constructor(private _http: HttpClient) { }

  //Récupérer les données de l'Input addTodo
  postData(description: any): Observable<any> {
    return this._http.post(this.backend, { description })
  }

  //Récupérer la liste de toutes les todo
  getAllTodos(): Observable<any> {
    return this._http.get(this.backend, { observe: 'response' })
  }

  //Supprimer une todo
  removeTodo(deleteTodo: any): Observable<any> {
    return this._http.delete(`${this.backend}/${deleteTodo}`)
  }

  //Modifier une Todo
  updateTodo(id:number, description:string): Observable<any> {
    return this._http.put(`${this.backend}/${id}`,{description})
  }


}