import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { StorageService } from './storage.service';
import { Cart } from '../model/cart';
import { AuthenticationService } from './authentication.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Cart[] = [];

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService
  ) {}

  getCount(): number {
    let cart: Cart[] = this.storageService.getCart();
    let loggedInUser: User = this.authenticationService.getLoggedInUser();

    if (cart) {
      let userCart: Cart | undefined = cart.find(
        (c) => c.user.id === loggedInUser.id
      );

      let count: number = 0;
      if (userCart) {
        for (let product of userCart.cart) {
          if (product.count) {
            count += product.count;
          }
        }
      }
      return count;
    } else {
      return 0;
    }
  }

  addToCart(prodId: number): void {
    let loggedInUser: User = this.authenticationService.getLoggedInUser();
    let products: Product[] = this.storageService.getSavedProducts();

    let product: Product | undefined = products.find((p) => p.id === prodId);

    if (product) {
      let userCart: Cart | undefined = this.cart.find(
        (ct) => ct.user.id === loggedInUser.id
      );

      if (userCart) {
        let prodExist: Product | undefined = userCart?.cart.find(
          (pd) => pd.id === prodId
        );

        if (prodExist) {
          let newCart: Product[] = [];
          for (let product of userCart?.cart) {
            if (product.id === prodId) {
              newCart.push({ ...product, count: product.count! + 1 });
            } else {
              newCart.push(product);
            }
          }
          userCart.cart = newCart;
        } else {
          userCart?.cart.push({ ...product, count: 1 });
        }

        let updatedCart: Cart[] = this.cart.filter(
          (c) => c.user.id !== loggedInUser.id
        );
        updatedCart.push(userCart);
        this.storageService.setCart(updatedCart);
      } else {
        let newCart: Cart = {
          user: loggedInUser,
          cart: [{ ...product, count: 1 }],
        };
        this.cart.push(newCart);
        this.storageService.setCart(this.cart);
      }
    }
  }

  getUserCart(): Product[] {
    let loggedInUser: User = this.storageService.getLoggedUser();
    let cart: Cart[] = this.storageService.getCart();

    if (cart) {
      let userCart: Product[] | undefined = cart.find(
        (c) => c.user.id === loggedInUser.id
      )?.cart;
      if (!userCart) userCart = [];
      return userCart;
    } else return [];
  }
}
