import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  constructor(
    private cartService: CartService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.cartProducts = this.cartService.getUserCart();
  }

  getTotalPrice(): number {
    let total = 0;
    for (let cartProd of this.cartProducts) {
      let newPrice: number = cartProd.price;
      let newCount: number = cartProd.count || 0;
      total += newPrice * newCount;
    }
    return total;
  }

  checkoutHandler() {
    this.storageService.removeCart();
    this.ngOnInit();
    this.cartService.getCount();
  }
}
