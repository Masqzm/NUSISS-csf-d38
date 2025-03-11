import Dexie, { Table } from 'dexie'
import { Injectable } from "@angular/core";
import { Task } from './models';


@Injectable()
export class TaskRepository extends Dexie {
    taskTable!: Table<Task, string>

    constructor() {
        // DB name
        super('taskdb')

        // ccreate collections
        this.version(1).stores({
            tasks: 'id'
        })

        this.taskTable = this.table('tasks')
    }

    saveTask(task: Task): Promise<Task> {
        return this.taskTable.add(task)
                .then(() => task)           // return task wrapped in Promise
    }

    removeTask(id: string) {
        return this.taskTable.delete(id)
                .then(() => id)             // return id of deleted task wrapped in Promise
    }

    getAllTasks(): Promise<Task[]> {
        return this.taskTable.toArray()
    }
}