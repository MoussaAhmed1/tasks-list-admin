import { Component, Inject } from '@angular/core';
import { TaskAdminService } from '../../services/task-admin.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import dayjs from 'dayjs';
import { Task } from '../../../../../interfaces/Tasks';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { environment } from '../../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  createTaskForm!: FormGroup;
  fileName!: string;
  preview!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private service: TaskAdminService,
    public dialog: MatDialogRef<CreateTaskComponent>,
    private matDialog: MatDialog,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public translate: TranslateService
  ) {
    this.createForm();
  }
  
  createForm() {
    if(this.data){
      this.createTaskForm = this.fb.group({
        title: [this.data.title, [Validators.required, Validators.minLength(5)]],
        userId: [this.data.userId?._id, Validators.required],
        image: [this.data.image, Validators.required],
        description: [this.data.description, Validators.required],
        deadline: [ new Date(this.data?.deadline.split('-').reverse().join('-')).toISOString(), Validators.required],
      });
      this.fileName = this.data.image
      this.preview = environment.baseApi + "/" + this.data.image
    }
    else{
      
      this.createTaskForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        userId: ['', Validators.required],
        image: ['',],
        description: ['', Validators.required],
        deadline: ['', Validators.required],
      });
    }
    console.log(this.createTaskForm.dirty);
  }

  selectImage($event: any) {
    this.fileName = $event.target.value;
    this.createTaskForm.patchValue({
      ...this.createTaskForm.value,
      image: $event.target.files[0],
    });
    this.preview = URL.createObjectURL($event.target.files[0])
    // this.createTaskForm.get('image')?.setValue($event.target.files[0]);
  }
  ToFormDataFun() {
    const formdata = new FormData();
    let newData = dayjs(this.createTaskForm.value['deadline']).format('DD-MM-YYYY');
    Object.entries(this.createTaskForm.value).forEach(([key, value]: any) => {
      if(key == 'deadline') {
        formdata.append(key , newData)
      }
     else{
      formdata.append(key, value);
     } 
    });
    return formdata;
  }
  
  close() {
    if(this.createTaskForm.dirty) {
       this.matDialog.open(ConfirmationComponent, {
        width: '750px'
      });
     
    }else {
      this.dialog.close()
    }
  }


  createTask() {
    this.service.createTask(this.ToFormDataFun()).subscribe({

      next: (res) => {
        this.toastr.success('Task created successfully');
        this.dialog.close(true);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message);
      },
    });
  }
  updateTask() {
    this.service.updateTask(this.ToFormDataFun(), this.data._id).subscribe({

      next: (res) => {
        this.toastr.success('Task updated successfully');
        this.dialog.close(true);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message);
      },
    });
  }
}
