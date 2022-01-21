import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { FormService } from 'src/app/form/services/form.service';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private formService: FormService) {}

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
}
