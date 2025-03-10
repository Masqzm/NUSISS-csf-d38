import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task.component';
import { TaskStore } from './task.store';
import { ListTasksComponent } from './components/list-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ListTasksComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
  providers: [ TaskStore ],
  bootstrap: [AppComponent]
})
export class AppModule { }
