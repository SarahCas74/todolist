import { Component, OnInit } from '@angular/core';

import { DescriptionComponent } from './../../modales/description/description.component';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecapComponent } from 'src/app/modales/recap/recap.component';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-mytodolist',
  templateUrl: './mytodolist.component.html',
  styleUrls: ['./mytodolist.component.scss']
})
export class MytodolistComponent implements OnInit {
  taches: any[] = []
  todoForm = new FormControl("");

  constructor(private matdialog: MatDialog, private _todoService: TodolistService) { }

  ngOnInit(): void {

    //Récupérer la liste des ToDo
    this._todoService.getAllTodos().subscribe((response: any) => {
      this.taches = response.body
    })

  }

  //Ajouter une todo
  onAdd() {

    this._todoService.postData(this.todoForm.value).subscribe((response: any) => {

      //Ouvrir une modal
      let dialogRef = this.matdialog.open(RecapComponent, {
        width: '250px',
        data: response
      })

      //Fermer une modal
      dialogRef.afterClosed().subscribe((description: any) => {
        this.taches.push(description)
      })

    })

    //Pour supprimer le message une fois que je l'ai envoyé
    this.todoForm.reset()
  }

  //Méthode quand on tape sur entrer pour envoyer
  onSendMessage(event: KeyboardEvent) {
    if (event.code === "Enter") {
      this.onAdd()
    }
  }

  //Supprimer une Todo
  onRemoveTodo(todo: any) {
    this._todoService.removeTodo(todo.todo_id).subscribe((response) => {
      console.log(response);

      this.taches = this.taches.filter((value: any) => value.todo_id !== todo.todo_id)
    })
  }



  //Editer une Todo
  openModalEditTodo(item: any) {
    //Ouvrir une modal
    let dialogRef = this.matdialog.open(DescriptionComponent, {
      width: '250px',
      data: item
    })
    //Fermer une modal
    dialogRef.afterClosed().subscribe((updatedTodo: any) => {
      this.taches = this.taches.map((todo) => {
        if (updatedTodo.todo_id == todo.todo_id) {
          return updatedTodo
        }
        return todo
      })
    })


  }


}






