import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-register',
  template: `
    <form>
        Email:<input type="email" [(ngModel)]="registerData.email" name="email" placeholder="Email" />
        Senha:<input type="password" [(ngModel)]="registerData.password" name="password" />
        Nome:<input type="text" [(ngModel)]="registerData.name" name="name" />
        Descrição:<input type="text" [(ngModel)]="registerData.description" name="description" />
        <button routerLink="/" (click)="Post()">Register</button>
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
