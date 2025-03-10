import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../models';
import { TaskStore } from '../task.store';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  private fb = inject(FormBuilder)
  private taskStore = inject(TaskStore)

  protected form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }

  processForm() {
    const task: Task = {
      ...this.form.value,
      id: ''
    }
    console.info('>>> task: ', task)

    this.taskStore.addTask(task)

    // Reset form
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>(''),
      priority: this.fb.control<string>('low')
    })
  }
}