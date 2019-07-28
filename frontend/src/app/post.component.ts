import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  template: `
    <h1>Novo produto</h1>
    <form>
        <textarea [(ngModel)]="postMsg" name="description" placeholder="Post"></textarea>
        <button (click)="post()" class="btn btn-primary">Post</button>
    </form>
  `,
  styleUrls: ['./app.component.css']
})
export class PostComponent {
    constructor(private apiService: ApiService, private route: ActivatedRoute) {}

    postMsg = '';

    post() {
        const msg = this.postMsg;
        const author = this.apiService.getId;
        this.apiService.postMessage({msg, author});
    }
}
