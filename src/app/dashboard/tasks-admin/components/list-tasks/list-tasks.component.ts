import { Component, OnInit } from '@angular/core';
import { TaskAdminService } from '../../services/task-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ToastrService } from 'ngx-toastr';
import { MatSelectChange } from '@angular/material/select';
import { MatDatepickerInputEvent,DateRange } from '@angular/material/datepicker';
import moment from 'moment';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';
export interface Task {
  position: string;
  title: string;
  user: string;
  deadline: number;
  status: number;
  actions: string;
}
export interface TaskFilter {
  page: number;
  limit: number;
  keyword?: string;
  userId?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css',
})
export class ListTasksComponent implements OnInit {
ImgUrl(image: string) {
  if (!image) {
    return "/assets/no-photo.jpg"
  }
  return environment.baseApi + "/" + image
}


displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadline',
    'status',
    'actions',
  ];
  dataSource: Task[] = [];
  filteration: TaskFilter = {
    page: 1,
    limit: 10,
    
  };
  timeOutId: any;
  total: any;
  users:{name:string,id:string}[]=[];
  statuses:any = [
    {name:"Completed" },
    {name:"	In-Progress" },
  ]
  constructor(
    private taskAdminService: TaskAdminService,
    private dialog: MatDialog,
    private toaster: ToastrService,
    public translate: TranslateService
  ) {}
  
  ngOnInit() {
    this.getTasks();
    //get users 
    this.users = [
      { name: "admin", id: "670432fd48dcf56849da43ac" },
      { name: "Mousa", id: "66fba7841ead90cbdbb33277" },
    ]
  }
  changePage($event: PageEvent) {
    this.filteration = {
      ...this.filteration,
      page: $event.pageIndex + 1,
      limit: $event.pageSize
    }
    this.getTasks();
    }
  
  //filterations
  search(val: EventTarget | null) {
    const search = (val as HTMLInputElement).value;
    console.log(search);
    this.filteration = {
      ...this.filteration,
      page: 1,
      keyword: search,
    }
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getTasks();
    },1000)
  }

  changeUser($event: MatSelectChange) {
    this.filteration = {
      ...this.filteration,
      page: 1,
      userId: $event.value,
    }
    this.getTasks();
  }

  changeStatus($event: MatSelectChange) {
    this.filteration = {
      ...this.filteration,
      page: 1,
      status: $event.value.trim(),
    }
    this.getTasks();
  }

  changeDate($event: MatDatepickerInputEvent<any,DateRange<any>>,type:string) {
    this.filteration = {
      ...this.filteration,
      page: 1,
      [type]: moment($event.value).format('DD-MM-YYYY') ,
    }
    if(type == 'toDate' && this.filteration['toDate'] !== 'Invalid date') {
      this.getTasks()
    }
    }

  getTasks() {
    this.taskAdminService.getTasks(this.filteration).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = res?.tasks;
        this.total = res?.totalItems;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  addTask() {
    let dialogRef = this.dialog.open(CreateTaskComponent, {
      minWidth: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      //revalidate
      if (result == true) {
        this.getTasks();
      }
    });
  }

  deleteTask(id: string) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      minWidth: '450px',
      disableClose: true,
      data: { title: this.translate.instant('tasks.deleteTaskConfirmation') },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      //revalidate
      if (result == true) {
        this.taskAdminService.deleteTask(id).subscribe({
          next: (res: any) => {
            this.toaster.success('Task has been deleted sucessfully');
            this.getTasks();
          },
          error: (err) => {
            this.toaster.error(err?.error?.message);
          },
        });
      }
    });
  }
  updateTask(task: any) {
    let dialogRef = this.dialog.open(CreateTaskComponent, {
      minWidth: '450px',
      disableClose: true,
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      //revalidate
      if (result == true) {
        this.getTasks();
      }
    });
  }
}


