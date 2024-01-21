import { AfterContentInit, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../auth.service';
import { RoutesApp } from '../../constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    NzGridModule,
    NzCardModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
  ],
  providers: [NzMessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  signInForm = this.fb.group({
    // username: [null, [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  validateForm = this.fb.group({
    typeDocument: [null, [Validators.required]],
    documentNumber: [null, [Validators.required]],
  });

  public isVisible: boolean = false;
  public documentTypes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _authSvc: AuthService,
    private _router: Router,
    private _message: NzMessageService
  ) {}

  submitForm(): void {
    if (this.signInForm.valid) {
      this._authSvc
        .login(this.signInForm.value)
        .then((response) => {
          this._authSvc.setToken(response);
          this._router.navigate([RoutesApp.home]);
        })
        .catch((error) => {
          console.log({ error });
          error.code === 'auth/invalid-credential'
            ? this._message.warning(
                `Las credenciales ingresadas no son correctas, por favor verifique el correo y contraseña`
              )
            : false;
        });
    } else {
      this._message.error(
        'Los datos ingresados no son validos, por favor verifiquelos'
      );
    }
  }
}
