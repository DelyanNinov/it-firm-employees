import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { FormService } from 'src/app/form/services/form.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private formService: FormService, private datePipe: DatePipe) {}
  startDate = new Date();
  endDate = new Date();
  getUserData() {
    const users$ = this.formService.users$.pipe(
      map((users) => {
        const newUsers = users.map((user) => {
          let dates = user.workingDays.map((user) => {
            const userArr = Object.values(user);
            const userObj = {
              [userArr[0]]: userArr[1],
            };
            return userObj;
          });
          let newUser = {};
          Object.assign(newUser, {
            name_cyr: user.name_cyr,
            work_area: user.work_area,
            company: user.company,
            email: user.email,
            telephone: user.telephone,
          });
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

    const today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    if (month.length < 2) {
      month = '0' + month;
    }
    let lastDay = new Date(year, today.getMonth() + 1, 0);

    if (start === '' && end === '') {
      this.startDate = new Date(`${year}-${month}-01`);
      this.endDate = new Date(`${year}-${month}-${lastDay.getDate()}`);
    } else if (start !== '' && end === '') {
      this.startDate = new Date(start);
      this.endDate = new Date(`${year}-${month}-${lastDay.getDate()}`);
    } else if (start === '' && end !== '') {
      this.startDate = new Date(`${year}-${month}-01`);
      this.endDate = new Date(end);
    } else {
      this.startDate = new Date(start);
      this.endDate = new Date(end);
    }

    const dates = this.getDaysArray(this.startDate, this.endDate);
    const formatedDates = dates.map((date) => {
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    });
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
