import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-register',
  template: `
    <form>
        <input type="email" [(ngModel)]="registerData.email" name="email" placeholder="Email" />
        <input type="password" [(ngModel)]="registerData.password" name="password" placeholder="Password" />
        <input type="text" [(ngModel)]="registerData.name" name="name" placeholder="Nome" />
        <input type="text" [(ngModel)]="registerData.description" name="description" placeholder="Descrição" /><br/>
        <button routerLink="/" (click)="Post()" class="btn btn-primary">Register</button>
    </form>
  `,
  styleUrls: ['./app.component.css']
})
export class RegisterComponent {
    registerData = {};

    constructor(private apiService: ApiService) {}

    Post() {
        this.apiService.sendUserRegistration(this.registerData);
    }
}
