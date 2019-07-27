import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `
    <h1>Profile</h1>
    <div>
        <p>Nome: {{profile?.user.name}}</p>
        <p>Email: {{profile?.user.email}}</p>
        <p>Descrição: {{profile?.user.description}}</p>
    </div>
    <h1>Products</h1>
    <app-messages></app-messages>
  `,
  styleUrls: ['./app.component.css']
})
export class ProfileComponent {
    constructor(private apiService: ApiService, private route: ActivatedRoute) {}

    profile;

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        const id = this.route.snapshot.params.id;
        console.log(id);
        this.apiService.getProfile(id).subscribe(data => this.profile = data);
    }
}
