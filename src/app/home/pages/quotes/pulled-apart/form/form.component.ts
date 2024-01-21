import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalHeaderComponent } from '../../../../global-header/global-header.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IDataForm } from '../../../../../../interfaces/form-data.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from './form.service';
import { QuotesService } from '../../quotes.service';
import { RoutesApp } from '../../../../../constants';
import { IPulledApartData } from '../../../../../../interfaces/pulled-apart-data.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    GlobalHeaderComponent,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
  ],
  templateUrl: './form.component.html',
  styles: ``,
})
export class FormComponent implements OnInit {
  @Input() dataForm: IDataForm | null = null;

  public reference: string = '';

  public form = this._fb.group({
    name: ['', [Validators.required]],
    price: [50, [Validators.required, Validators.min(50)]],
    pricePerMeter: [50, [Validators.required, Validators.min(50)]],
    pricePerSquareMeter: [50, [Validators.required, Validators.min(50)]],
  });

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _formSvc: FormService,
    private _activeRute: ActivatedRoute,
    private _quotesSvc: QuotesService
  ) {}

  ngOnInit(): void {
    this.dataFormLoad();
  }

  dataFormLoad(): void {
    if (this.dataForm) {
      if (this.dataForm.reference === 'perfil') {
        this.reference = `${this.dataForm.reference}es`;
      } else {
        this.reference = `${this.dataForm.reference}s`;
      }
      if (
        this.dataForm.formControl_name.value &&
        this.dataForm.formControl_price.value
      ) {
        if (this.dataForm.formControl_price.name === 'price') {
          this.form.setValue({
            name: this.dataForm.formControl_name.value,
            price: this.dataForm.formControl_price.value,
            pricePerMeter: 50,
            pricePerSquareMeter: 50,
          });
        }
        if (this.dataForm.formControl_price.name === 'pricePerMeter') {
          this.form.setValue({
            name: this.dataForm.formControl_name.value,
            pricePerMeter: this.dataForm.formControl_price.value,
            price: 50,
            pricePerSquareMeter: 50,
          });
        }
        if (this.dataForm.formControl_price.name === 'pricePerSquareMeter') {
          this.form.setValue({
            name: this.dataForm.formControl_name.value,
            pricePerSquareMeter: this.dataForm.formControl_price.value,
            pricePerMeter: 50,
            price: 50,
          });
        }
      }
      if (
        !this.dataForm.formControl_name.value &&
        !this.dataForm.formControl_price.value
      ) {
        if (this.dataForm.formControl_price.name === 'price') {
          this.form.setValue({
            name: '',
            price: 0,
            pricePerMeter: 50,
            pricePerSquareMeter: 50,
          });
        }
        if (this.dataForm.formControl_price.name === 'pricePerMeter') {
          this.form.setValue({
            name: '',
            pricePerMeter: 0,
            pricePerSquareMeter: 50,
            price: 50,
          });
        }
        if (this.dataForm.formControl_price.name === 'pricePerSquareMeter') {
          this.form.setValue({
            name: '',
            pricePerSquareMeter: 0,
            pricePerMeter: 50,
            price: 50,
          });
        }
      }
    } else {
      const dataForm = localStorage.getItem('dataForm');
      if (dataForm) {
        const dataFormParse: IDataForm = JSON.parse(dataForm);
        this.dataForm = dataFormParse;

        if (this.dataForm.reference === 'perfil') {
          this.reference = `${this.dataForm.reference}es`;
        } else {
          this.reference = `${this.dataForm.reference}s`;
        }
      }
    }
  }

  register() {
    if (this.dataForm && this.form.valid) {
      if (this.dataForm.reference === RoutesApp.acrylic) {
        const dto = {
          name: this.form.controls.name.value,
          pricePerSquareMeter: this.form.controls.pricePerSquareMeter.value,
        };
        this._formSvc
          .registerAcrylic(dto)
          .then((acrylic) => {
            const pulledApartData = localStorage.getItem('pulledApartData');
            if (pulledApartData) {
              const pulledApartDataParse: IPulledApartData =
                JSON.parse(pulledApartData);
              this._quotesSvc.getAcrylics().subscribe(
                (acrylics) => {
                  let post = pulledApartDataParse;
                  post.pulledAparts = acrylics;
                  localStorage.setItem('pulledApartData', JSON.stringify(post));
                  this._router.navigate([
                    `${RoutesApp.home}/${RoutesApp.acrylics}`,
                  ]);
                },
                (error) => console.log({ error })
              );
            }
          })
          .catch((error) => console.log({ error }));
      }
      if (this.dataForm.reference === RoutesApp.glass) {
        const dto = {
          name: this.form.controls.name.value,
          pricePerSquareMeter: this.form.controls.pricePerSquareMeter.value,
        };
        this._formSvc
          .registerGlass(dto)
          .then((glass) => {
            const pulledApartData = localStorage.getItem('pulledApartData');
            if (pulledApartData) {
              const pulledApartDataParse: IPulledApartData =
                JSON.parse(pulledApartData);
              this._quotesSvc.getGlasses().subscribe(
                (glasses) => {
                  let post = pulledApartDataParse;
                  post.pulledAparts = glasses;
                  localStorage.setItem('pulledApartData', JSON.stringify(post));
                  this._router.navigate([
                    `${RoutesApp.home}/${RoutesApp.glasses}`,
                  ]);
                },
                (error) => console.log({ error })
              );
            }
            // this._router.navigate([
            //   `${RoutesApp.home}/${RoutesApp.glasses}`,
            // ]);
          })
          .catch((error) => console.log({ error }));
      }
      if (this.dataForm.reference === RoutesApp.profile) {
        const dto = {
          name: this.form.controls.name.value,
          pricePerMeter: this.form.controls.pricePerMeter.value,
        };
        this._formSvc
          .registerProfile(dto)
          .then((profile) => {
            const pulledApartData = localStorage.getItem('pulledApartData');
            if (pulledApartData) {
              const pulledApartDataParse: IPulledApartData =
                JSON.parse(pulledApartData);
              this._quotesSvc.getProfiles().subscribe(
                (profiles) => {
                  let post = pulledApartDataParse;
                  post.pulledAparts = profiles;
                  localStorage.setItem('pulledApartData', JSON.stringify(post));
                  this._router.navigate([
                    `${RoutesApp.home}/${RoutesApp.profiles}`,
                  ]);
                },
                (error) => console.log({ error })
              );
            }
            // this._router.navigate([
            //   `${RoutesApp.home}/${RoutesApp.profiles}`,
            // ]);
          })
          .catch((error) => console.log({ error }));
      }
      if (this.dataForm.reference === RoutesApp.accessory) {
        const dto = {
          name: this.form.controls.name.value,
          price: this.form.controls.price.value,
        };
        this._formSvc
          .registerAccessory(dto)
          .then((accessory) => {
            const pulledApartData = localStorage.getItem('pulledApartData');
            if (pulledApartData) {
              const pulledApartDataParse: IPulledApartData =
                JSON.parse(pulledApartData);
              this._quotesSvc.getAccessories().subscribe(
                (accessories) => {
                  let post = pulledApartDataParse;
                  post.pulledAparts = accessories;
                  localStorage.setItem('pulledApartData', JSON.stringify(post));
                  this._router.navigate([
                    `${RoutesApp.home}/${RoutesApp.accessories}`,
                  ]);
                },
                (error) => console.log({ error })
              );
            }
            // this._router.navigate([
            //   `${RoutesApp.home}/${RoutesApp.accessories}`,
            // ]);
          })
          .catch((error) => console.log({ error }));
      }
    }
  }

  edit(): void {
    if (this.dataForm && this.form.valid) {
      if (
        this.dataForm.reference === RoutesApp.acrylic &&
        this.dataForm.referenceId
      ) {
        const dto = {
          name: this.form.controls.name.value,
          pricePerSquareMeter: this.form.controls.pricePerSquareMeter.value,
        };
        this._formSvc
          .editAcrylic(this.dataForm.referenceId, dto)
          .then((acrylic) => {})
          .catch((error) => console.log({ error }));
      }
      if (
        this.dataForm.reference === RoutesApp.glass &&
        this.dataForm.referenceId
      ) {
        const dto = {
          name: this.form.controls.name.value,
          pricePerSquareMeter: this.form.controls.pricePerSquareMeter.value,
        };
        this._formSvc
          .editGlass(this.dataForm.referenceId, dto)
          .then((glass) => {})
          .catch((error) => console.log({ error }));
      }
      if (
        this.dataForm.reference === RoutesApp.accessory &&
        this.dataForm.referenceId
      ) {
        const dto = {
          name: this.form.controls.name.value,
          price: this.form.controls.price.value,
        };
        this._formSvc
          .editAccessory(this.dataForm.referenceId, dto)
          .then((accessory) => {})
          .catch((error) => console.log({ error }));
      }
      if (
        this.dataForm.reference === RoutesApp.profile &&
        this.dataForm.referenceId
      ) {
        const dto = {
          name: this.form.controls.name.value,
          pricePerMeter: this.form.controls.pricePerMeter.value,
        };
        this._formSvc
          .editProfile(this.dataForm.referenceId, dto)
          .then((profile) => {})
          .catch((error) => console.log({ error }));
      }
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('dataForm');
  }
}
