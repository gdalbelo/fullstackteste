import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-login',
  template: `
    <form>
        Email:<input type="email" [(ngModel)]="loginData.email" name="email" placeholder="Email" />
        Senha:<input type="password" [(ngModel)]="loginData.password" name="password" />
        <button (click)="Post()">Login</button>
    </form>
  `,
  styleUrls: ['./app.component.css']
})
export class LoginComponent {
    loginData = {};

    constructor(private apiService: ApiService) {}

    Post() {
        this.apiService.loginUser(this.loginData);
    }
}
