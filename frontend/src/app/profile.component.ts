import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `
    <h1>Profile</h1>
    <div>
        <p>Nome: {{profile?.name}}</p>
        <p>Email: {{profile?.email}}</p>
        <p>Descrição: {{profile?.description}}</p>
    </div>
    <h1>Products</h1>
    <div>
        <app-messages></app-messages>
    </div>
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
