import { inject, Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Task, TaskSlice } from "./models";
import { v4 as uuidv4 } from 'uuid'
import { catchError, concatMap, EMPTY, from, mergeMap, Observable, tap } from "rxjs";
import { TaskRepository } from "./task.repository";

const INIT: TaskSlice = {
    tasks: [],
    audit: [],
    priorityFilter: 'all'
}

@Injectable()
export class TaskStore extends ComponentStore<TaskSlice> {
    private taskRepo = inject(TaskRepository)

    constructor() {
        // Init the store (initially store is empty)
        super(INIT)
    }

    // Effect - side effect (making a change outside of store)
    // saveTask(newTask) 
    // 1. save to IndexedDB
    // 2. save to store
    readonly saveTask = this.effect(
        (newTask$: Observable<Task>) => 
            newTask$.pipe(
                // 1. save to IndexedDB
                mergeMap(newTask => {
                    const toSave: Task = {
                        ...newTask,
                        id: uuidv4().substring(0, 8)
                    }
                    // convert promise to observable
                    return from(this.taskRepo.saveTask(toSave))
                }),
                // 2. save to store
                tap(newTask => this.addTask(newTask)),
                catchError(() => EMPTY)     // return empty result on error
            )
    )

    // removeTask(id)
    readonly removeTask = this.effect(
        (taskId$: Observable<string>) => 
            taskId$.pipe(
                concatMap(
                    (id: string) => from(this.taskRepo.removeTask(id))
                ),
                tap(id => this.delTask(id))
            )
    )

    // readonly - Const for classes
    // Mutators - update mtds
    // addTask(newTask)
    readonly addTask = this.updater<Task>(      // updater<obj to be passed in to update>
        (slice: TaskSlice, newTask: Task) => {
            // Update newTask by adding a generated Task.id
            const toSave: Task = {
                ...newTask,
                id: !!newTask.id ? newTask.id : uuidv4().substring(0, 8)
            }
            console.info('>>> toSave: ', toSave)

            return {
                tasks: [...slice.tasks, toSave],
                audit: [...slice.audit, `Added new task on ${new Date()}`]
            } as TaskSlice
        }
    )

    readonly addTasks = this.updater<Task[]>(
        (slice: TaskSlice, newTasks: Task[]) => {
            const toSave = newTasks.map(t => {
                return {
                    ...t,
                    id: !!t.id ? t.id : uuidv4().substring(0, 8)
                }
            })
            
            return {
                tasks: [...slice.tasks, ...toSave],
                audit: [...slice.audit, `Added ${toSave.length} tasks on ${new Date()}`]
            } as TaskSlice
        }
    )

    readonly delTask = this.updater<string>(
        (slice: TaskSlice, taskId: string) => {            
            return {
                tasks: slice.tasks.filter(t => t.id != taskId),
                audit: [...slice.audit, `Deleted task on ${new Date()}`]
            } as TaskSlice
        }
    )

    // Selectors (query)
    readonly getTasks$ = (priority: string) => {
        return this.select<Task[]>(
            (slice: TaskSlice) => slice.tasks.filter(
                task => (priority == 'all') || (task.priority == priority)
            )
        )
    }
    
    readonly getTasksCount$ = this.select<number>(
        (slice: TaskSlice) => slice.tasks.length
    )
}