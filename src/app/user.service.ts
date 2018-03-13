import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {User} from './user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

    private url = 'http://localhost:2403/users';

    constructor(private http: Http) { }

    getUsers() {
        return this.http.get(this.url);
    }

    createUser(obj: User) {
        return this.http.post(this.url, obj);
    }

    deleteUser(id: any) {
        return this.http.delete(this.url + '/' + id);
    }

    updateUser(id: any, obj: User) {
        return this.http.put(this.url + '/' + id, obj);
    }
}
