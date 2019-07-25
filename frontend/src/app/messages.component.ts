import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  template: `<div *ngFor="let msg of apiService.messages">
  <p>{{msg.msg}}</p>
</div>`
})
export class MessagesComponent {

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    const userId = this.route.snapshot.params.id;
    this.apiService.getMessage(userId);
  }
}
