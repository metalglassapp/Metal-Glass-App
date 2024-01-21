import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-types-of-documents',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- <p>
      types-of-documents works!
    </p> -->
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class TypesOfDocumentsComponent {}
