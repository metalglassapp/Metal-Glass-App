import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddFormComponent } from './add-form/add-form.component';
import { QuotesService } from '../../../quotes.service';
import { IAccessory } from '../../../../../../../interfaces/accessory.interface';
import { IProfile } from '../../../../../../../interfaces/profile.interface';
import { IGlass } from '../../../../../../../interfaces/glass.interface';
import { IAcrylic } from '../../../../../../../interfaces/acrylic.interface';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-quote-section',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    AddFormComponent,
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzDividerModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './quote-section.component.html',
  styleUrl: './quote-section.component.css',
})
export class QuoteSectionComponent implements OnInit {
  @Input() productPerQuote: {
    type: string;
    amount: number;
    articuleNumer: number;
  } = {
    type: '',
    amount: 0,
    articuleNumer: 0,
  };

  public addForm: FormGroup = this._fb.group({
    // accessories: [null, [Validators.required]],
    accessories: [],
    profiles: [],
    glasses: [],
    acrylics: [],
  });

  get selectedAccessories(): FormControl {
    return this.addForm.controls['accessories'] as FormControl;
  }

  get selectedProfiles(): FormControl {
    return this.addForm.controls['profiles'] as FormControl;
  }

  get selectedGlasses(): FormControl {
    return this.addForm.controls['glasses'] as FormControl;
  }

  get selectedAcrylics(): FormControl {
    return this.addForm.controls['acrylics'] as FormControl;
  }

  public quoteForm: FormGroup = this._fb.group({
    // accessoryList: [],
    accessoryList: this._fb.array([
      this._fb.group({
        accessoryId: ['', [Validators.required]],
        amount: [1, [Validators.required, Validators.min(1)]],
      }),
    ]),
    // profileList: [],
    profileList: this._fb.array([
      this._fb.group({
        accessoryId: ['', [Validators.required]],
        amount: [1, [Validators.required, Validators.min(1)]],
      }),
    ]),
    // glassList: [],
    glassList: this._fb.array([
      this._fb.group({
        accessoryId: ['', [Validators.required]],
        amount: [1, [Validators.required, Validators.min(1)]],
      }),
    ]),
    // acrylicList: [],
    acrylicList: this._fb.array([
      this._fb.group({
        accessoryId: ['', [Validators.required]],
        amount: [1, [Validators.required, Validators.min(1)]],
      }),
    ]),
  });

  get accessoryList() {
    return this.quoteForm.controls['accessoryList'] as FormArray;
  }

  get profileList() {
    return this.quoteForm.controls['profileList'] as FormArray;
  }

  get glassList() {
    return this.quoteForm.controls['glassList'] as FormArray;
  }

  get acrylicList() {
    return this.quoteForm.controls['acrylicList'] as FormArray;
  }

  public quoteFormAbosulte: FormGroup = this._fb.group({
    add: this._fb.array([
      this._fb.group({
        accessoriesSelected: [],
        profilesSelected: [],
        glassesSelected: [],
        acrylicsSelected: [],
      }),
    ]),
  });

  public accessories: Array<IAccessory> = [];
  public profiles: Array<IProfile> = [];
  public glasses: Array<IGlass> = [];
  public acrylics: Array<IAcrylic> = [];
  constructor(
    private _fb: FormBuilder,
    private _quotesService: QuotesService
  ) {}

  ngOnInit(): void {
    this.getAccessories();
  }

  getAccessories(): void {
    this._quotesService.getAccessories().subscribe(
      (accessories) => {
        this.accessories = accessories;
      },
      (error) => console.log({ error })
    );
    this._quotesService.getProfiles().subscribe(
      (profiles) => {
        this.profiles = profiles;
      },
      (error) => console.log({ error })
    );
    this._quotesService.getGlasses().subscribe(
      (glasses) => {
        this.glasses = glasses;
      },
      (error) => console.log({ error })
    );
    this._quotesService.getAcrylics().subscribe(
      (acrylics) => {
        this.acrylics = acrylics;
      },
      (error) => console.log({ error })
    );
  }

  log(e: Event) {}

  addAccessories(e: Array<any>): void {
    while (this.accessoryList.length !== 0) {
      this.accessoryList.removeAt(0);
    }
    e.forEach((accessoryItem) => {
      const accessory = this._fb.group({
        accessoryId: [accessoryItem.id, [Validators.required]],
        amount: [1, [Validators.required]],
      });
      this.accessoryList.push(accessory);
    });
  }

  addProfiles(e: Array<any>): void {
    while (this.profileList.length !== 0) {
      this.profileList.removeAt(0);
    }
    e.forEach((profileItem) => {
      const profile = this._fb.group({
        profileId: [profileItem.id, [Validators.required]],
        amount: [1, [Validators.required]],
      });
      this.profileList.push(profile);
    });
  }

  addGlasses(e: Array<any>): void {
    while (this.glassList.length !== 0) {
      this.glassList.removeAt(0);
    }
    e.forEach((glassItem) => {
      const glass = this._fb.group({
        glassId: [glassItem.id, [Validators.required]],
        amount: [1, [Validators.required]],
      });
      this.glassList.push(glass);
    });
  }

  addAcrylics(e: Array<any>): void {
    while (this.acrylicList.length !== 0) {
      this.acrylicList.removeAt(0);
    }
    e.forEach((acrylicItem) => {
      const acrylic = this._fb.group({
        acrylicId: [acrylicItem.id, [Validators.required]],
        amount: [1, [Validators.required]],
      });
      this.acrylicList.push(acrylic);
    });
  }

  removeAccessory(i: number): void {
    if (this.selectedAccessories.value.length > 1) {
      this.selectedAccessories.value.removeAt(i);
      // this.resetReview();
    }
  }

  removeProfile(i: number): void {
    if (this.selectedProfiles.value.length > 1) {
      this.selectedProfiles.value.removeAt(i);
      // this.resetReview();
    }
  }

  removeGlass(i: number): void {
    if (this.selectedGlasses.value.length > 1) {
      this.selectedGlasses.value.removeAt(i);
      // this.resetReview();
    }
  }

  removeAcrylic(i: number): void {
    if (this.selectedAcrylics.value.length > 1) {
      this.addForm.controls['acrylics'].patchValue([]);
    }
  }
}
