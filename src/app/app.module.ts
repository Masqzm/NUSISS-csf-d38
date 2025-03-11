import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task.component';
import { TaskStore } from './task.store';
//import { TaskStore } from './task.store.nonhof';
import { ListTasksComponent } from './components/list-tasks.component';
import { TaskCountComponent } from './components/task-count.component';
import { TaskRepository } from './task.repository';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ListTasksComponent,
    TaskCountComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
  providers: [ TaskStore, TaskRepository ],
  bootstrap: [AppComponent]
})
export class AppModule { }
