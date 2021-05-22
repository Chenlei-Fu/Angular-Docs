import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  shippingCosts = this.cartService.getShippingPrices();
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {}

  setShippingPrice(price: string) {
    this.cartService.setShippingPrice(price);
  }
}
