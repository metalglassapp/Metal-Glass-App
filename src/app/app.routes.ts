import { Routes } from '@angular/router';
import { RoutesApp } from './constants';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { QuotesComponent } from './home/pages/quotes/quotes.component';
import { SalesComponent } from './home/pages/sales/sales.component';
import { ProductsComponent } from './home/pages/products/products.component';
import { AssignmentsComponent } from './home/pages/assignments/assignments.component';
import { ClientsComponent } from './home/pages/clients/clients.component';
import { TypesOfDocumentsComponent } from './home/pages/types-of-documents/types-of-documents.component';
import { ContentComponent } from './home/pages/content/content.component';
import { RegisterDocumentTypeComponent } from './home/pages/types-of-documents/register-document-type/register-document-type.component';
import { TypesOfDocumentsContentComponent } from './home/pages/types-of-documents/types-of-documents-content/types-of-documents-content.component';
import { ClientsContentComponent } from './home/pages/clients/clients-content/clients-content.component';
import { ClientRegisterComponent } from './home/pages/clients/client-register/client-register.component';
import { AssignmentsContentComponent } from './home/pages/assignments/assignments-content/assignments-content.component';
import { AssignmentRegisterComponent } from './home/pages/assignments/assignment-register/assignment-register.component';
import { QuotesContentComponent } from './home/pages/quotes/quotes-content/quotes-content.component';
import { QuoteFormComponent } from './home/pages/quotes/quote-form/quote-form.component';
import { PulledApartComponent } from './home/pages/quotes/pulled-apart/pulled-apart.component';
import { PulledApartContentComponent } from './home/pages/quotes/pulled-apart/pulled-apart-content/pulled-apart-content.component';
import { FormGuard } from './home/pages/quotes/pulled-apart/form/form.guard';
import { FormComponent } from './home/pages/quotes/pulled-apart/form/form.component';
import { ProductsContentComponent } from './home/pages/products/products-content/products-content.component';
import { ProductsRegisterComponent } from './home/pages/products/products-register/products-register.component';

export const routes: Routes = [
  {
    path: RoutesApp.auth,
    component: LoginComponent,
  },
  {
    canActivate: [AuthGuard],
    path: RoutesApp.home,
    component: HomeComponent,
    children: [
      {
        path: RoutesApp.root,
        component: ContentComponent,
      },
      {
        path: RoutesApp.accessories,
        component: PulledApartComponent,
        children: [
          {
            path: RoutesApp.root,
            component: PulledApartContentComponent,
          },
          {
            canActivate: [FormGuard],
            canLoad: [FormGuard],
            path: `${RoutesApp.form}${RoutesApp.accessory}`,
            component: FormComponent,
          },
          { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
        ],
      },
      {
        path: RoutesApp.profiles,
        component: PulledApartComponent,
        children: [
          {
            path: RoutesApp.root,
            component: PulledApartContentComponent,
          },
          {
            canActivate: [FormGuard],
            canLoad: [FormGuard],
            path: `${RoutesApp.form}${RoutesApp.profile}`,
            component: FormComponent,
          },
          { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
        ],
      },
      {
        path: RoutesApp.glasses,
        component: PulledApartComponent,
        children: [
          {
            path: RoutesApp.root,
            component: PulledApartContentComponent,
          },
          {
            canActivate: [FormGuard],
            canLoad: [FormGuard],
            path: `${RoutesApp.form}${RoutesApp.glass}`,
            component: FormComponent,
          },
          { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
        ],
      },
      {
        path: RoutesApp.acrylics,
        component: PulledApartComponent,
        children: [
          {
            path: RoutesApp.root,
            component: PulledApartContentComponent,
          },
          {
            canActivate: [FormGuard],
            canLoad: [FormGuard],
            path: `${RoutesApp.form}${RoutesApp.acrylic}`,
            component: FormComponent,
          },
          { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
        ],
      },
      {
        path: RoutesApp.quotes,
        component: QuotesComponent,
        children: [
          {
            path: RoutesApp.root,
            component: QuotesContentComponent,
          },
          {
            path: RoutesApp.quoteRegister,
            component: QuoteFormComponent,
          },
          { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
        ],
      },
      // {
      //   path: RoutesApp.sales,
      //   component: SalesComponent,
      // },
      {
        path: RoutesApp.products,
        component: ProductsComponent,
        children: [
          {
            path: RoutesApp.root,
            component: ProductsContentComponent,
          },
          {
            path: RoutesApp.productRegister,
            component: ProductsRegisterComponent,
          },
          { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
        ],
      },
      {
        path: RoutesApp.assignments,
        component: AssignmentsComponent,
        children: [
          {
            path: RoutesApp.root,
            component: AssignmentsContentComponent,
          },
          {
            path: RoutesApp.assignmentRegister,
            component: AssignmentRegisterComponent,
          },
          { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
        ],
      },
      {
        path: RoutesApp.clients,
        component: ClientsComponent,
        children: [
          {
            path: RoutesApp.root,
            component: ClientsContentComponent,
          },
          {
            path: RoutesApp.clientRegister,
            component: ClientRegisterComponent,
          },
          { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
        ],
      },
      {
        path: RoutesApp.documentTypes,
        component: TypesOfDocumentsComponent,
        children: [
          {
            path: RoutesApp.root,
            component: TypesOfDocumentsContentComponent,
          },
          {
            path: RoutesApp.documentTypeRegister,
            component: RegisterDocumentTypeComponent,
          },
          { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
        ],
      },
      { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: RoutesApp.home, pathMatch: 'full' },
];
