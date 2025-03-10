import { Component, inject, OnInit } from '@angular/core';
import { TaskStore } from '../task.store';
import { Observable } from 'rxjs';
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
    this.tasks$ = this.taskStore.getTasks
  }
}
