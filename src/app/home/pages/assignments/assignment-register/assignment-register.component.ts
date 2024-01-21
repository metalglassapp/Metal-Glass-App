import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalHeaderComponent } from '../../../global-header/global-header.component';
import { AssignmentsService } from '../assignments.service';
import { RoutesApp } from '../../../../constants';
import { IAssignment } from '../../../../../interfaces/assignment.interface';
import { IGlobalHeaderData } from '../../../../../interfaces/global-header-data.interface';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IAssignmentRegisterRequest } from '../../../../../interfaces-request/assignment-register.inerface';

@Component({
  selector: 'app-assignment-register',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    GlobalHeaderComponent,
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzDividerModule,
    NzSelectModule,
    NzInputModule,
    NzMessageModule,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './assignment-register.component.html',
  styleUrl: './assignment-register.component.css',
})
export class AssignmentRegisterComponent {
  @Output() assignmentEmitter: EventEmitter<IAssignment> = new EventEmitter();
  @Input() assignment: IAssignment | null = null;
  @Input() usersNames: Array<{ name: string }> = [];
  @Input() employeesNames: Array<{ name: string }> = [];

  public globalHeaderData: IGlobalHeaderData = {
    tittle: 'Registrar Asignación',
    backTo: {
      label: 'Volval a Asignaciones',
      route: `${RoutesApp.home}/${RoutesApp.assignments}`,
    },
  };

  public employeeId: string = '';
  // public users: IUser[] = [];
  // public adminsList: IUser[] = [];
  // public employeesList: IEmployee[] = [];
  // public user: IUser | null = null;
  public users: any[] = [];
  public adminsList: any[] = [];
  public employeesList: any[] = [];
  public user: any | null = null;

  public registerAssignmentForm = this._fb.group({
    theAssigned: ['', [Validators.required]],
    whoAssigns: [[''], [Validators.required]],
    responsibleForTheAssignment: [[''], [Validators.required]],
  });

  public selectedPhotos: Array<any> = [];
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _assignmentsSvc: AssignmentsService,
    private _message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.registerAssignmentForm.controls['whoAssigns'].setValue([]);
    this.registerAssignmentForm.controls[
      'responsibleForTheAssignment'
    ].setValue([]);
    this.getEmployeeId();
    this.getUser();
    this.getUsers();
    this.getEmployees();
    this.assignment
      ? this.initForm(this.assignment)
      : (this.getUsersNames(), this.getEmployeesNames());
  }

  initForm(assignament: IAssignment): void {
    this.registerAssignmentForm.controls['theAssigned'].setValue(
      assignament.theAssigned
    );
    this.registerAssignmentForm.controls[
      'responsibleForTheAssignment'
    ].setValue(assignament.responsibleForTheAssignment);
    this.registerAssignmentForm.controls['whoAssigns'].setValue(
      assignament.whoAssigns ? assignament.whoAssigns : ['']
    );
  }

  getUsersNames(): void {
    // this._assignmentsSvc.getUsersNames().subscribe(
    //   (usersNames) => {
    //     this.assignment?.whoAssigns.forEach((who) => {
    //       !usersNames.includes({ name: who })
    //         ? usersNames.push({ name: who })
    //         : false;
    //     });
    //     this.usersNames = usersNames;
    //   },
    //   (error) => {
    //     console.log({ error });
    //   }
    // );
    this.usersNames.push({ name: 'Johan Leandro' });
    this.usersNames.push({ name: 'Ines Margarita' });
  }

  getEmployeesNames(): void {
    // this._assignmentsSvc.getEmployeesNames().subscribe(
    //   (employeesNames) => {
    //     this.assignment?.responsibleForTheAssignment.forEach((responsible) => {
    //       !employeesNames.includes({ name: responsible })
    //         ? employeesNames.push({ name: responsible })
    //         : false;
    //     });
    //     this.employeesNames = employeesNames;
    //   },
    //   (error) => {
    //     console.log({ error });
    //   }
    // );
    this.employeesNames.push({ name: 'Otro' });
  }

  getEmployeeId(): void {
    const employeeId = this._route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.employeeId = employeeId;
    }
  }

  getUser(): void {
    // const accessToken = localStorage.getItem('accessToken');
    // if (accessToken) {
    //   const accessTokenParse: IAccessToken = JSON.parse(accessToken);
    //   this._assignmentsSvc.getUser(accessTokenParse.userId).subscribe(
    //     (user) => {
    //       this.user = user;
    //     },
    //     (err) => console.log({ error: err })
    //   );
    // }
  }

  getUsers(): void {
    // this._assignmentsSvc.getUsers().subscribe(
    //   (users) => {
    //     this.users = users;
    //     this.adminsList = users;
    //   },
    //   (err) => console.log({ error: err })
    // );
  }

  getEmployees(): void {
    // this._assignmentsSvc.getEmployees().subscribe(
    //   (employees) => {
    //     this.employeesList = employees;
    //     this.employeesList.forEach((employee) => {
    //       this.employeesList.includes(employee)
    //         ? this.employeesList.push(employee)
    //         : false;
    //     });
    //   },
    //   (err) => console.log({ error: err })
    // );
  }

  registerAssignment(): void {
    if (!this.registerAssignmentForm.valid) {
      this._message.error('El formulario no es valido');
      return;
    }
    // if (!this.user) {
    //   this.getUser();
    //   this._message.error(
    //     'Hubo un error interno, por favor vuelva a intentarlo'
    //   );
    //   return;
    // }
    const body: IAssignmentRegisterRequest = {
      theAssigned: this.registerAssignmentForm.value.theAssigned ?? '',
      whoAssigns: this.registerAssignmentForm.value.whoAssigns ?? [''],
      responsibleForTheAssignment: this.registerAssignmentForm.value
        .responsibleForTheAssignment ?? [''],
      registerDate: this.changeFormat(new Date()),
      lastUpdateDate: this.changeFormat(new Date()),
    };
    this._assignmentsSvc
      .registerAssignment(body)
      .then((res) => {
        this._message.success('La assignación fue registrada exitosamente');
        this.registerAssignmentForm.reset();
      })
      .catch((error) => {
        console.log({ error });
        this._message.success(
          'Hubo un error con el registro de la asignación, por favor vuelva a intentarlo'
        );
      });
  }

  changeFormat(date: Date): string {
    const dia = new Array(7);
    dia[0] = 'Domingo';
    dia[1] = 'Lunes';
    dia[2] = 'Martes';
    dia[3] = 'Miércoles';
    dia[4] = 'Jueves';
    dia[5] = 'Viernes';
    dia[6] = 'Sábado';
    // return dia[day];
    const pipe = new DatePipe('en-US');
    return `
    ${dia[date.getDay()]},
    ${pipe.transform(date, 'dd/MM/YYYY, h:mm a') ?? ''}
    `;
  }

  editAssignment(assignamentId: string): void {
    if (!this.registerAssignmentForm.valid) {
      this._message.error('El formulario no es valido');
      return;
    }
    if (!this.user) {
      this.getUser();
      this._message.error(
        'Hubo un error interno, por favor vuelva a intentarlo'
      );
      return;
    }
    // localStorage.setItem('spinning', 'true');
    // this._assignmentsSvc
    //   .editAssignment(assignamentId, this.registerAssignmentForm.value)
    //   .subscribe(
    //     (assignment) => {
    //       this._message.success('La edicion de la asignación, fue exitosa');
    //       // this._router.navigate(['/admin/home/asignaciones']);
    //       this.assignmentEmitter.emit(assignment);
    //       localStorage.setItem('spinning', 'false');
    //     },
    //     (error) => {
    //       console.log({ error });
    //       this._message.error(
    //         'Hubo un error interno, por favor vuelva a intentarlo'
    //       );
    //       localStorage.setItem('spinning', 'false');
    //     }
    //   );
  }
}
