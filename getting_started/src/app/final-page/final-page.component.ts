import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrls: ['./final-page.component.css']
})
export class FinalPageComponent implements OnInit {
  totalCost: number = this.cartService.getTotalPrice();
  constructor(private cartService: CartService) {}

  ngOnInit() {}
}
