import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlobalHeaderComponent } from '../../global-header/global-header.component';
import { ModuleListComponent } from '../../components/module-list/module-list.component';
import { ChartsComponent } from '../../components/charts/charts.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { IGlobalHeaderData } from '../../../../interfaces/global-header-data.interface';
import { RoutesApp } from '../../../constants';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    CommonModule,
    GlobalHeaderComponent,
    ModuleListComponent,
    ChartsComponent,
    NzGridModule,
  ],
  template: `
    <!-- <p>content works!</p> -->
    <app-global-header [data]="globalHeaderData"></app-global-header>
    <div
      nz-row
      [nzAlign]="'middle'"
      [nzGutter]="[0, 0]"
      [nzJustify]="'space-evenly'"
      class="content-container"
    >
      <!-- <div nz-col [nzSpan]="22" [nzMd]="11" class="module-list-container"> -->
      <div nz-col class="module-list-container">
        <app-module-list></app-module-list>
      </div>
      <!-- <div nz-col [nzSpan]="22" [nzMd]="11" class="charts-container">
        <app-charts></app-charts>
      </div> -->
    </div>
  `,
  styles: `

  div {
    height: 100%;
    width: 100%;
  }

  .content-container {
    height: calc(100% - 130px);
  }

  .module-list-container {
    border: solid 1px rgb(233, 233, 233);
    padding: 10px;
    overflow-y: auto;
  }

  .charts-container {
    border: solid 5px gray;
  }

  `,
})
export class ContentComponent {
  globalHeaderData: IGlobalHeaderData = {
    tittle: 'Bienvenido',
    backTo: {
      label: 'Cerrar secion',
      route: RoutesApp.auth,
    },
    logoutCondition: true,
  };
}
