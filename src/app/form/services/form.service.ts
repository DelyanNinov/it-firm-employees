import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EmployeeInterface } from '../types/employee.interface';

@Injectable({ providedIn: 'root' })

export class FormService {

  // REST_API_SERVER = 'http://localhost:3000/employees';

  users$ = of([
    {
      employee_id: 1,
      name_cyr: 'Delyan Ninov',
      name_latin: 'Delyan Ninov',
      email: 'dninov@gmail.com'
    },
    {
      employee_id: 2,
      name_cyr: 'Ivan Ivanov',
      name_latin: 'Ivan Ivanov',
      email: 'ivan@gmail.com'
    },
    {
      employee_id: 3,
      name_cyr: 'Georgi Dimitrov',
      name_latin: 'Georgi Dimitrov',
      email: 'georgi@gmail.com'
    }
  ])
  
  constructor(private http: HttpClient) {}

  getEmployees():Observable<EmployeeInterface[]> {
    // return <Observable<EmployeeInterface[]>>this.http.get(this.REST_API_SERVER);
    return <Observable<EmployeeInterface[]>>this.users$
    
  }
}
