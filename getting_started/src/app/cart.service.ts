import { Injectable } from '@angular/core';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class CartService {
  items: Product[] = [];
  shipPrice: string = '';
  itemPrice: string = '';
  constructor(private http: HttpClient) {}

  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{ type: string; price: number }[]>(
      '/assets/shipping.json'
    );
  }

  setShippingPrice(price) {
    this.shipPrice = price;
    window.alert(this.shipPrice);
  }

  getTotalPrice() {
    let total: number = 0;
    for (let item of this.items) {
      total += item.price;
    }
    return total + Number(this.shipPrice);
  }
}
