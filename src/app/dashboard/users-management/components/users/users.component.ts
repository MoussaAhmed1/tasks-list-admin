import { Component, OnInit } from '@angular/core';
import { ChangeStatus, UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'tasksAssigned',
    'actions',
  ];
  dataSource: any = [];
  total!: number;
  filteration = {
    page: 1,
    limit: 10,
    name: '',
  };
  constructor(
    private service: UserService,
    private toaster: ToastrService,
    public translate: TranslateService,
    private dialog: MatDialog
    ) {
    this.getDataFromSubject();
  }
  page = 1;
  totalItems: any;
  searchInput = new FormControl('');
  timeOutId: any;
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const Model = {
      page: this.page,
      limit: this.filteration.limit,
      name: this.filteration.name,
    };
    this.service.getUsersData(Model);
  }

  getDataFromSubject() {
    this.service.userData.subscribe((res: any) => {
      this.dataSource = res.data;
      this.totalItems = res.total;
    });
  }

  changePage(event: PageEvent) {
    this.filteration = {
      ...this.filteration,
      page: event.pageIndex + 1,
      limit: event.pageSize
    }
    this.getUser();
  }
  onsearch(val: EventTarget | null) {
    const search = (val as HTMLInputElement).value;
    clearTimeout(this.timeOutId);
    this.filteration = {
      ...this.filteration,
      page: 1,
      name: search ?? '',
    };
    this.timeOutId = setTimeout(() => {
      this.getUser();   
    },1000);
  }

  changeUserStatus(status: string, id: string, index: number) {
    const Model: ChangeStatus = {
      id,
      status,
    };
    if (this.dataSource[index].assignedTasks > 0) {
      this.toaster.error("You Can't Update This User Until Finish His Tasks");
    } else {
      this.service.changeStatus(Model).subscribe((res) => {
        this.toaster.success('User Status Updated Successfully');
        this.page = 1;
        this.getUser();
      });
    }
  }
  deleteUser(id: string, index: number) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      disableClose: true,
      data: { title: this.translate.instant('users.deleteUserConfirmation') },
    })
    dialogRef.afterClosed().subscribe((result) => {
      if(result == true) {
        
        if (this.dataSource[index].assignedTasks > 0) {
          this.toaster.error("You Can't Delete This User Until Finish His Tasks");
        } else {
          this.service.deleteUser(id).subscribe((res) => {
            this.toaster.success('User Deleted Successfully');
            this.page = 1;
            this.getUser();
          });
        }
      }
    })
  }
}
