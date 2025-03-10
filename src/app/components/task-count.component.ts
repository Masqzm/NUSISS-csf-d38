import { Component, inject, OnInit } from '@angular/core';
import { TaskStore } from '../task.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-count',
  standalone: false,
  templateUrl: './task-count.component.html',
  styleUrl: './task-count.component.css'
})
export class TaskCountComponent {
  protected taskStore = inject(TaskStore)
}
