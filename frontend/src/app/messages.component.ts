import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  template: `
<div *ngFor="let msg of apiService.messages">
    <div *ngIf="!edit">
      {{msg.msg}}
    </div>
    <div *ngIf="edit">
      <input type="text" [(ngModel)]="msg.msg" (blur)="this.salvarProduto(msg, msg._id)" />
    </div>
    <button class="btn btn-info" (click)="edit = !edit">Editar</button>
    <button class="btn btn-danger" (click)="deletePost(msg._id, msg.author)">Excluir</button>
</div>`,
  styleUrls: ['./app.component.css']
})
export class MessagesComponent {

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    const id = localStorage.getItem('id');
    const userId = this.route.snapshot.params.id;
    this.apiService.getMessage(userId);
  }

  salvarProduto(msg, id) {
    console.log('msg' + msg.msg);
    console.log('id' + id);
    this.apiService.atualizaProduto(msg.msg, id);
  }

  deletePost(id, author) {
    console.log('deleted id: ' + id);
    this.apiService.deletePost(id, author);
  }
}
