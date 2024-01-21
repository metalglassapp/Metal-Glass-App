import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalHeaderComponent } from '../../../global-header/global-header.component';
import { ModulesListComponent } from '../components/modules-list/modules-list.component';
import { ListQuotesComponent } from '../components/list-quotes/list-quotes.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { IGlobalHeaderData } from '../../../../../interfaces/global-header-data.interface';
import { RoutesApp } from '../../../../constants';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-quotes-content',
  standalone: true,
  imports: [
    RouterLink,
    GlobalHeaderComponent,
    ModulesListComponent,
    ListQuotesComponent,
    NzGridModule,
    NzDividerModule,
    NzButtonModule,
  ],
  template: `
    <!-- <p>
      quotes-content works!
    </p> -->
    <!-- <p>quotes works!</p> -->
    <app-global-header [data]="globalHeaderData"></app-global-header>
    <!-- <app-quotes-content></app-quotes-content> -->
    <div nz-row nzAlign="middle" nzJustify="space-around" [nzGutter]="[24, 24]">
      <div
        nz-col
        [nzXXl]="22"
        [nzXl]="22"
        [nzLg]="22"
        [nzMd]="22"
        [nzSm]="22"
        [nzXs]="22"
      >
        <nz-divider nzText="Apartados referentes"></nz-divider>
        <app-modules-list></app-modules-list>
      </div>
      <div
        nz-col
        [nzXXl]="24"
        [nzXl]="24"
        [nzLg]="24"
        [nzMd]="24"
        [nzSm]="24"
        [nzXs]="24"
        class="registerButton"
      >
        <div nz-row nzAlign="middle" [nzGutter]="[24, 24]" nzJustify="end">
          <div
            nz-col
            [nzXXl]="4"
            [nzXl]="4"
            [nzLg]="6"
            [nzMd]="7"
            [nzSm]="10"
            [nzXs]="22"
          >
            <div nz-row nzAlign="middle" [nzGutter]="[0, 0]" nzJustify="start">
              <div
                nz-col
                [nzXXl]="22"
                [nzXl]="22"
                [nzLg]="22"
                [nzMd]="22"
                [nzSm]="22"
                [nzXs]="22"
              >
                <button
                  title="Registrar cotización"
                  [type]="'button'"
                  nz-button
                  nzType="primary"
                  type="button"
                  [routerLink]="['/home/cotizaciones/registro-cotizacion']"
                  class="quoteRegisterButton"
                >
                  Registrar una cotización
                </button>
              </div>
            </div>
          </div>
        </div>
        <div nz-row nzAlign="middle" nzJustify="space-around">
          <div
            nz-col
            [nzXXl]="22"
            [nzXl]="22"
            [nzLg]="22"
            [nzMd]="22"
            [nzSm]="22"
            [nzXs]="22"
          >
            <nz-divider
              nzText="Lista de cotizaciones"
              nzOrientation="left"
            ></nz-divider>
            <app-list-quotes></app-list-quotes>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `.quoteRegisterButton {
  width: 100%;
}
`,
})
export class QuotesContentComponent {
  public globalHeaderData: IGlobalHeaderData = {
    tittle: 'Cotizaciones',
    backTo: { label: 'Volver a Home', route: RoutesApp.home },
  };
}
