import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- <p>
      auth works!
    </p> -->
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class AuthComponent {}
