import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EmployeeInterface } from '../types/employee.interface';

@Injectable({ providedIn: 'root' })
export class FormService {
  // REST_API_SERVER = 'http://localhost:3000/employees';

  users$ = new BehaviorSubject([
    {
      employee_id: 1,
      name_cyr: 'Delyan Ninov',
      name_latin: 'Delyan Ninov',
      email: 'dninov@gmail.com',
      work_area: 'JavaScript',
      company: 'Mega Bankruptcy LTD',
      workingDays: [
        { date: '2022-01-03', shift: 'office' },
        { date: '2022-01-04', shift: 'home' },
        { date: '2022-01-05', shift: 'rest' },
      ],
    },
    {
      employee_id: 2,
      name_cyr: 'Ivan Ivanov',
      name_latin: 'Ivan Ivanov',
      email: 'ivan@gmail.com',
      work_area: 'Python',
      company: 'Mega Bankruptcy LTD',
      workingDays: [
        { date: '2022-01-03', shift: 'home' },
        { date: '2022-01-04', shift: 'office' },
        { date: '2022-01-05', shift: 'rest' },
      ],
    },
    {
      employee_id: 3,
      name_cyr: 'Georgi Dimitrov',
      name_latin: 'Georgi Dimitrov',
      email: 'georgi@gmail.com',
      company: 'Mega Bankruptcy LTD',
      work_area: 'Project Manager',
      workingDays: [
        { date: '2022-01-03', shift: 'rest' },
        { date: '2022-01-04', shift: 'home' },
        { date: '2022-01-05', shift: 'office' },
      ],
    },
    {
      employee_id: 4,
      name_cyr: 'Panayot Hitov',
      name_latin: 'Panayot Hitov',
      email: 'panayot@gmail.com',
      work_area: 'Java',
      company: 'Ultra Falitis LTD',
      workingDays: [
        { date: '2022-01-03', shift: 'office' },
        { date: '2022-01-04', shift: 'home' },
        { date: '2022-01-05', shift: 'home' },
      ],
    },
    {
      employee_id: 5,
      name_cyr: 'Rumen Rumen',
      name_latin: 'Rumen Rumen',
      email: 'rumen@gmail.com',
      work_area: 'Java',
      company: 'Ultra Falitis LTD',
      workingDays: [
        { date: '2022-01-03', shift: 'office' },
        { date: '2022-01-04', shift: 'home' },
        { date: '2022-01-05', shift: 'office' },
      ],
    },
  ]);

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<EmployeeInterface[]> {
    // return <Observable<EmployeeInterface[]>>this.http.get(this.REST_API_SERVER);
    return <Observable<EmployeeInterface[]>>this.users$;
  }

  updateEmployeeSchedule(name: string, date: string, shift: string) {
    let usersArr = this.users$.getValue();
    const user = usersArr.find((user) => user.name_cyr === name);
    const existingDay = user?.workingDays.filter((day) => day.date === date);

    if (existingDay?.length) {
      existingDay[0].shift = shift;
      console.log(usersArr);
    } else {
      user?.workingDays.push({ date: date, shift: shift });
      console.log(usersArr);
    }
    this.users$.next([...usersArr]);
    console.log(this.users$.getValue());
  }
}
