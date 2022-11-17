import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodolistService } from 'src/app/services/todolist.service';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  todoUpdated=new FormControl ();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ref: MatDialogRef<any>,
    private _todoService: TodolistService) { }

  ngOnInit(): void {
console.log(this.data);

    this.todoUpdated.setValue(this.data.description)
  }

  closeModal() {
    this._ref.close();
  }

  onEdit(todo: any) {
    this._todoService.updateTodo(todo.todo_id, this.todoUpdated.value).subscribe((response) => {
      console.log(response);


    this._ref.close(
      {
        todo_id : todo.todo_id,
        description:this.todoUpdated.value
      }
    )

    })


  }
}
