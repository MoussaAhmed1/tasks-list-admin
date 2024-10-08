import { Component, OnInit } from '@angular/core';
import { TaskAdminService } from '../../services/task-admin.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent implements OnInit{
  tasksArray:any[]=[]
  constructor(private taskAdminService:TaskAdminService){
  }

  ngOnInit() {
      this.getTasks();
   }  

  getTasks(){
    this.taskAdminService.getTasks().subscribe({
      next:(res)=>{
        console.log(res)
        // this.tasksArray.push(res?.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
