import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TaskStore } from '../task.store';
import { filter, Observable, tap } from 'rxjs';
import { Task } from '../models';

@Component({
  selector: 'app-list-tasks',
  standalone: false,
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent implements OnInit {
  private taskStore = inject(TaskStore)

  protected tasks$!: Observable<Task[]>

  ngOnInit(): void {
    this.tasks$ = this.taskStore.getTasks$('all')
  }

  deleteTask(taskId: string) {
    this.taskStore.delTask(taskId)
  }

  filterTasks($event: any) {
    const priority = $event.target.value
    console.log('>>> priority:', priority)
    
    //this.taskStore.updatePriorityView(priority)

    // Higher Order Fn. mtd
    this.tasks$ = this.taskStore.getTasks$(priority)
  }
}
