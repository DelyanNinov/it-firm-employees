import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { FormService } from 'src/app/form/services/form.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private formService: FormService, private datePipe: DatePipe) {}

  getUserData() {
    const users$ = this.formService.users$.pipe(
      map((users) => {
        const newUsers = users.map((user) => {
          let name = user.name_cyr;
          let dates = user.workingDays.map((user) => {
            const userArr = Object.values(user);
            const userObj = {
              [userArr[0]]: userArr[1],
            };
            return userObj;
          });
          let newUser = {};
          Object.assign(newUser, { name_cyr: name });
          dates.forEach((date) => {
            Object.assign(newUser, date);
          });
          return newUser;
        });
        return newUsers;
      })
    );
    return users$;
  }

  getFormatedDates(start: string, end: string) {
    //GET THE CURRENT MONTH AND RETURNS AN ARRAY OF DATES IN THE MONTH
    let startDate = new Date();
    let endDate = new Date();

    const today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    if (month.length < 2) {
      month = '0' + month;
    }
    let lastDay = new Date(year, today.getMonth() + 1, 0);

    if (start === '' && end === '') {
      startDate = new Date(`${year}-${month}-01`);
      endDate = new Date(`${year}-${month}-${lastDay.getDate()}`);
    } else if (start !== '' && end === '') {
      startDate = new Date(start);
      endDate = new Date(`${year}-${month}-${lastDay.getDate()}`);
    } else if (start === '' && end !== '') {
      startDate = new Date(`${year}-${month}-01`);
      endDate = new Date(end);
    } else {
      startDate = new Date(start);
      endDate = new Date(end);
    }

    const dates = this.getDaysArray(startDate, endDate);
    const formatedDates = dates.map((date) =>
      this.datePipe.transform(date, 'yyyy-MM-dd')
    );
    return formatedDates;
  }

  getDaysArray(start: Date, end: Date) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  }
}
