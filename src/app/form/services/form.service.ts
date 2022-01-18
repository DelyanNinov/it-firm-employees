import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EmployeeInterface } from '../types/employee.interface';

@Injectable({ providedIn: 'root' })
export class FormService {
  REST_API_SERVER = 'http://localhost:3000/employees';
  employees$: Observable<EmployeeInterface[]>
  constructor(private http: HttpClient) {}

  getEmployees():Observable<EmployeeInterface[]> {
    return <Observable<EmployeeInterface[]>>this.http.get(this.REST_API_SERVER);
  }
}
