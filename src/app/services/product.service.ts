import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  saveTempProducts(products: Product[]) {
    this.storageService.setProducts(products);
  }

  getLocalProducts(): Product[] {
    return this.storageService.getSavedProducts();
  }

  getSavedProducts(): Observable<Product[]> {
    let savedProducts: Product[] = this.storageService.getSavedProducts();

    return new Observable((obb) => {
      if (savedProducts.length > 0) {
        savedProducts = this.storageService.getSavedProducts();
        obb.next(this.storageService.getSavedProducts());
      }
      this.getAllProducts().subscribe({
        next: (products: Product[]) => {
          let isChanged: boolean =
            this.getSavedProducts.length !== products.length &&
            !savedProducts.every(
              (p, i) => p.id === products[i].id && p.price === products[i].price
            );

          if (!isChanged) {
            obb.next(products);
            this.storageService.setProducts(products);
          }
        },
        complete: () => {
          obb.complete();
        },
        error: (error: Error) => {
          obb.error(error);
        },
      });
    });
  }
}
