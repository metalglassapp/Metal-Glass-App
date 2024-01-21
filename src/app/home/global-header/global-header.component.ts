import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AuthService } from '../../auth/auth.service';
import { IGlobalHeaderData } from '../../../interfaces/global-header-data.interface';
import { RoutesApp } from '../../constants';

@Component({
  selector: 'app-global-header',
  standalone: true,
  imports: [CommonModule, NzGridModule, NzButtonModule],
  templateUrl: './global-header.component.html',
  styleUrl: './global-header.component.css',
})
export class GlobalHeaderComponent {
  @Input() data: IGlobalHeaderData = {
    tittle: '',
    backTo: { label: '', route: '' },
  };

  constructor(private _authSvc: AuthService, private _router: Router) {}

  logout(): void {
    this._authSvc
      .logout()
      .then((response) => {
        // localStorage.removeItem('accessToken');
        this._authSvc.removeToken();
        this._router.navigate([RoutesApp.auth]);
      })
      .catch((error) => console.log({ error }));
  }

  navigate(route: string): void {
    this._router.navigate([route]);
  }
}
