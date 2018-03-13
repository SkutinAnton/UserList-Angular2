import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements OnInit {

    editedUser: User;
    users: Array<User>;
    createPlace: boolean;
    saveButton: boolean;
    changeButton: boolean;

    constructor(private serv: UserService) {
        this.users = new Array<User>();
    }

    ngOnInit() {
        this.loadUsers(); // загружается список пользователей с сервера
    }

    // загрузка списка пользователей
    private loadUsers() {
        this.serv.getUsers().subscribe((resp: Response) => {
                this.users = resp.json();
            });
    }

    // активация поля для добавления пользователя
    addUser() {
        if (this.changeButton) {
            this.changeButton = false;
        }
        this.createPlace = true; // активируется поле
        this.saveButton = true; // активируется кнопка
        this.editedUser = new User(null, '', '', '', '');
    }

    // удаление пользователя
    deleteUser(user: User) {
        this.serv.deleteUser(user.id).subscribe((resp: Response) => {
            this.loadUsers();
        });
    }

    // активация поля для редактирования пользователя
    editUser(user: User) {
        if (this.saveButton) {
            this.saveButton = false;
        }
        this.createPlace = true; // активируется поле
        this.changeButton = true; // активируется кнопка
        this.editedUser = new User(user.id, user.name, user.login, user.email, user.status);
    }

    // сохраняем пользователя
    saveUser() {
        this.serv.createUser(this.editedUser).subscribe((resp: Response) => {
            this.loadUsers();
        });
        this.createPlace = false; // деактивируется поле
        this.saveButton = false; // деактивируется кнопка
        this.editedUser = null;
    }

    // изменяем пользователя
    changeUser() {
        this.serv.updateUser(this.editedUser.id, this.editedUser).subscribe((resp: Response) => {
            this.loadUsers();
        });
        this.createPlace = false; // деактивируется поле
        this.changeButton = false; // деактивируется кнопка
        this.editedUser = null;
    }

    // кнопка "Отмена"
    cancel() {
        this.createPlace = false; // деактивируется поле
        this.editedUser = null;
        this.saveButton = false; // деактивируется кнопка
        this.changeButton = false; // деактивируется кнопка
    }
}
