import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { NgForm } from '@angular/forms';
import { Product } from '../model/product';
import { Cart } from '../model/cart';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  users: User[] = [{ id: 1, email: 'yokesh@gmail.com', password: 'yokesh' }];
  randomId: number = Math.floor(Math.random() * 100);

  loadUsers() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  setCart(cart: Cart[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): Cart[] {
    return JSON.parse(localStorage.getItem('cart') as string);
  }

  removeCart(): void {
    return localStorage.removeItem('cart');
  }

  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') as string);
  }

  setUsers(email: string, password: string): User[] {
    const newUser: User = {
      id: this.randomId,
      email: email,
      password: password,
    };

    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return this.users;
  }

  setLoggedInUser(user: User): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem('loggedInUser') as string);
  }

  removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }

  setProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  getSavedProducts(): Product[] {
    return JSON.parse(localStorage.getItem('products') as string);
  }
}
