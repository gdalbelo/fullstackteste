import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-users',
  template: `<div *ngFor="let user of apiService.users">
                <p [routerLink]="['/profile', user._id]">{{user.name}}</p>
            </div>`
})
export class UsersComponent {

  constructor(private apiService: ApiService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.apiService.getUsers();
  }
}
