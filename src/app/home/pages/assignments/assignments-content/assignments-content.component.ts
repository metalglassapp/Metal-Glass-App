import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalHeaderComponent } from '../../../global-header/global-header.component';
import { AssignmentRegisterComponent } from '../assignment-register/assignment-register.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RoutesApp } from '../../../../constants';
import { AssignmentsService } from '../assignments.service';
import { IGlobalHeaderData } from '../../../../../interfaces/global-header-data.interface';
import { IAssignment } from '../../../../../interfaces/assignment.interface';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-assignments-content',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    RouterLink,
    GlobalHeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    NzGridModule,
    NzTableModule,
    NzSelectModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzAlertModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './assignments-content.component.html',
  styleUrl: './assignments-content.component.css',
})
export class AssignmentsContentComponent {
  public globalHeaderData: IGlobalHeaderData = {
    tittle: 'Asignaciones',
    backTo: { label: 'Volver a Home', route: RoutesApp.home },
  };

  public assignments: Array<IAssignment> = [];
  public assignmentsView: Array<IAssignment> = [];
  public searchValue = '';
  public visible = false;
  public allChecked = false;
  public indeterminate = true;
  public administratorsWhoAssignsListView: Array<{
    label: string;
    value: string;
    checked: boolean;
  }> = [];
  // public users: IUser[] = [];
  // public user: IUser | null = null;
  public users: any[] = [];
  public user: any | null = null;
  public assignmentPerDelete: IAssignment | null = null;

  public assignmentsFiltForm: FormGroup = this._fb.group({
    // the
  });

  public usersNames: Array<{ name: string }> = [];
  public whos: Array<string> = [];
  public employeesNames: Array<{ name: string }> = [];
  public theAssignments: Array<string> = [];

  filterForm = this._fb.group({
    whoAssigns: [],
    responsibleForTheAssignment: [],
    theAssigned: [],
  });

  constructor(
    private _assignmentsSvc: AssignmentsService,
    private _modal: NzModalService,
    private _message: NzMessageService,
    private _fb: FormBuilder
  ) {
    // localStorage.setItem('spinning', 'true');
  }

  ngOnInit(): void {
    this.getAssignments();
    this.getUsers();
    this.getUsersNames();
    this.getEmployeesNames();
  }

  getUsersNames(): void {
    // this._assignmentsSvc.getUsersNames().subscribe(
    //   (usersNames) => {
    //     this.usersNames = usersNames;
    //   },
    //   (error) => {
    //     console.log({ error });
    //   }
    // );
  }

  getEmployeesNames(): void {
    // this._assignmentsSvc.getEmployeesNames().subscribe(
    //   (employeesNames) => {
    //     this.employeesNames = employeesNames;
    //   },
    //   (error) => {
    //     console.log({ error });
    //   }
    // );
  }

  getUsers(): void {
    // this._assignmentsSvc.getUsers().subscribe(
    //   (users) => {
    //     this.users = users;
    //     this.users.forEach((user) => {
    //       if (user && user._id) {
    //         this.whos.push(user.names + ' ' + user.surnames);
    //         this.administratorsWhoAssignsListView.push({
    //           label: user.names + ' ' + user.surnames,
    //           value: user._id,
    //           checked: true,
    //         });
    //       }
    //     });
    //   },
    //   (err) => console.log({ error: err })
    // );
  }

  getAssignments(): void {
    this.theAssignments = [];
    this._assignmentsSvc.getAssignments().subscribe(
      (assignments) => {
        this.assignments = assignments;
        this.assignmentsView = this.assignments;
        assignments.forEach((assignment) => {
          this.theAssignments.includes(assignment.theAssigned)
            ? false
            : this.theAssignments.push(assignment.theAssigned);
        });
      },
      (err) => {
        console.log({ error: err });
      }
    );
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // search(): void {
  //   this.visible = false;

  //   if (this.administratorsWhoAssignsListView.length > 0) {
  //     this.assignmentsView = [];
  //   } else {
  //     this.assignmentsView = this.assignments;
  //   }
  // }

  search(): void {
    const dto = this.removeNullProperties(this.filterForm.value);
    const filt = this.assignments.filter((assignmentItem) => {
      return assignmentItem.theAssigned === dto.theAssigned;
    });
    this.assignmentsView = filt.length > 0 ? filt : this.assignments;
  }

  removeNullProperties(obj: any) {
    for (const key in obj) {
      if (
        obj[key] === null ||
        (Array.isArray(obj[key]) && obj[key].length === 0)
      ) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        this.removeNullProperties(obj[key]);
      }
    }
    return obj;
  }

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.administratorsWhoAssignsListView =
        this.administratorsWhoAssignsListView.map((item) => ({
          ...item,
          checked: true,
        }));
    } else {
      this.administratorsWhoAssignsListView =
        this.administratorsWhoAssignsListView.map((item) => ({
          ...item,
          checked: false,
        }));
    }
  }

  updateSingleChecked(): void {
    if (this.administratorsWhoAssignsListView.every((item) => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (
      this.administratorsWhoAssignsListView.every((item) => item.checked)
    ) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  showEditAssignment(assignment: IAssignment, i: number): void {
    // const usersNames = this.usersNames;
    // assignment?.whoAssigns.forEach((who) => {
    //   // this.usersNames.includes({ name: who })
    //   //   ? this.usersNames.push({ name: who })
    //   usersNames.includes({ name: who })
    //     ? usersNames.push({ name: who })
    //     : false;
    // });
    // const employeesNames = this.employeesNames;
    // assignment?.responsibleForTheAssignment.forEach((responsible) => {
    //   employeesNames.includes({ name: responsible })
    //     ? employeesNames.push({ name: responsible })
    //     : false;
    // });
    const assignmentRegisterComponent = this._modal.info({
      nzIconType: 'edit',
      nzContent: AssignmentRegisterComponent,

      // nzComponentParams: {
      //   assignment,
      //   // usersNames: this.usersNames,
      //   // employeesNames: this.employeesNames,
      //   usersNames,
      //   employeesNames,
      // },
      nzWidth: '90%',
      // nzOnCancel: () => this.getAssignments(),
      // nzOnOk: () => this.getAssignments(),
    });
    localStorage.setItem('assignment', JSON.stringify(assignment));
    // assignmentRegisterComponent.componentInstance?.assignmentEmitter.subscribe(
    //   (next) => {
    //     this.assignments.splice(i, 1, next);
    //   }
    // );
  }

  assignmentDelete(assignment: IAssignment): void {
    if (assignment.id) {
      this._assignmentsSvc
        // .deleteassignment(assignmentId)
        .deleteAssignment(assignment.id)
        .then((assignmentPostDeleteResponse) => {
          // this.getAssignments();
          this.assignmentPerDelete = null;
          this._message.success('Assignación eliminada correctamente');
        })
        .catch((error) => {
          console.log({ error });
          this._message.error(
            'Hubo un problema interno, por favor vuelva a intentarlo'
          );
        });
    }
  }
}
