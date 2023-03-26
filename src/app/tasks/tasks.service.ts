import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TasksService {
    private apiUrl = '/api/tasks';

    constructor(private http: HttpClient) { }

    // Get all tasks
    getAllTasks(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    // Add a task
    addTask(name: string): Observable<any> {
        const task = { name };
        return this.http.post<any>(this.apiUrl, task,);
    }

    // Update task
    updateTask(id: string, name: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        const task = { name };
        return this.http.put<any>(url, task);
    }

    // Delete task by ID
    deleteTask(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<any>(url);
    }

    // Delete ALL TASKS
    deleteAllTasks(): Observable<any> {
        const url = `${this.apiUrl}`;
        return this.http.delete<any>(url);
    }
}
