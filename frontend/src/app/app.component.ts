import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <ul  class="collapse bg-dark">
      <li routerLink="/">Registration App</li>
      <li><button *ngIf="!apiService.isAuthenticated" routerLink="/register">Register</button></li>
      <li><button *ngIf="!apiService.isAuthenticated" routerLink="/login">Login</button></li>
      <li><button *ngIf="apiService.isAuthenticated" (click)="apiService.logout()" routerLink="/">Logout</button></li>
      <li><button routerLink="/users">Users</button></li>
      <li><button routerLink="/products">Products</button></li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private apiService: ApiService) {

  }
}
