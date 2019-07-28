import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient, private route: Router) {}

    messages: any = [];
    users = [];
    TOKEN_KEY = 'token';
    path = 'http://localhost:3000';
    authPath = 'http://localhost:3000/auth';
    id = '';

    getMessage(userId) {
        this.http.get<any>(this.path + '/posts/' + userId).subscribe(res => {
            this.messages = res;
        });
    }

    get getId() {
        return this.id;
    }

    get token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    postMessage(message: any) {
        this.http.post<any>(this.path + '/post', message).subscribe(res => {
            this.messages = res;
        });
    }

    getUsers() {
        this.http.get<any>(this.path + '/users').subscribe(res => {
            this.users = res;
        });
    }

    getProfile(id) {
        return this.http.get(this.path + '/profile/' + id);
    }

    sendUserRegistration(regData) {
        this.http.post<any>(this.authPath + '/register', regData).subscribe(res => {
            console.log(res);
            localStorage.setItem(this.TOKEN_KEY, res.token);
            this.id = res.id;
        });
        if (this.isAuthenticated) {
            this.route.navigateByUrl('/users');
        } else {
            console.log('Registration Failed');
        }
    }

    loginUser(loginData) {
        this.http.post<any>(this.authPath + '/login', loginData).subscribe(res => {
            localStorage.setItem('token', res.token);
            this.id = res.id;
        });
    }

    atualizaProduto(msg, id) {
        const obj: any = {};
        obj.msg = msg;
        obj.id = id;
        this.http.put<any>(this.path + '/post-edit', obj).subscribe(res => {
            console.log(res);
        });
    }

    deletePost(id, authorid) {
        this.http.delete(this.path + '/post-delete/' + id).subscribe(r => {
            this.http.get<any>(this.path + '/posts/' + authorid).subscribe(res => {
                this.messages = res;
            });
        });
    }
}
