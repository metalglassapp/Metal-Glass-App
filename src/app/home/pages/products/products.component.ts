import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterOutlet],
  // templateUrl: './products.component.html',
  // styleUrl: './products.component.css'
  template: `
    <!-- <p>products works!</p> -->
    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class ProductsComponent {}
