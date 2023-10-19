import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private storageService: StorageService) {}

  isValidUser(user: User): boolean {
    let users: User[] = this.storageService.getAllUsers();
    let isUser: boolean = false;
    for (let u of users) {
      if (u.email === user.email && u.password === user.password) {
        isUser = true;
        this.storageService.setLoggedInUser(u);
        break;
      }
    }
    return isUser;
  }

  logout(): void {
    this.storageService.removeLoggedInUser();
  }

  isLoggedIn(): boolean {
    return this.storageService.isUserLoggedIn();
  }

  getLoggedInUser():User {
    return this.storageService.getLoggedUser();
  }
}
