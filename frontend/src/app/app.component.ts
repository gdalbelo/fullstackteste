import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li routerLink="/">Registration App</li>
      <li><button *ngIf="!apiService.isAuthenticated" routerLink="/register" class="btn btn-info">Register</button></li>
      <li><button *ngIf="!apiService.isAuthenticated" routerLink="/login" class="btn btn-info">Login</button></li>
      <li><button *ngIf="apiService.isAuthenticated" (click)="apiService.logout()" routerLink="/" class="btn btn-info">Logout</button></li>
      <li><button *ngIf="apiService.isAuthenticated" routerLink="/users" class="btn btn-info">Users</button></li>
      <li><button *ngIf="apiService.isAuthenticated" routerLink="/products" class="btn btn-info">Products</button></li>
    </ul>
    <div class="center">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private apiService: ApiService) {

  }
}
