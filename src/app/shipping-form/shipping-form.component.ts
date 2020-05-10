import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {
    name: null,
    addressLine1: null,
    addressLine2: null,
    city: null
  };
  userId: string;
  userSubscription: Subscription;
  @Input('cart') cart: ShoppingCart;
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) {

  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => { this.userId = user.uid });
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
