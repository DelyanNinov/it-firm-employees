import {Component, OnInit} from '@angular/core'
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms'
import {map, Observable, startWith} from 'rxjs'
import { FormService } from '../services/form.service'
import { EmployeeInterface } from '../types/employee.interface'

@Component({
  selector: 'mc-login',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder, private formService: FormService) {}
  names: string[] = []
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.initializeForm()
    this.formService.getEmployees().subscribe((employees) => {
      employees.map((employee) => this.names.push(employee.name_cyr))
    })

  }

  initializeForm(): void {
    this.form = this.fb.group({
      nameSearch: new FormControl (['']),
      startDate: new FormControl  (['']),
      endDate: new FormControl (['']),
      email: new FormControl ([''], [Validators.required, Validators.email]),
      message: new FormControl ([''], [Validators.required]),
    })
    this.filteredOptions = this.form.controls['nameSearch'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }
  private _filter(value: string): string[] {
    console.log();
    
    const filterValue = value.toLowerCase();
    return this.names.filter(name => name.toLowerCase().includes(filterValue));
  }
  get email() { return this.form.get('email'); }
  get message() { return this.form.get('message'); }
  onSubmit(): void {
    console.log(this.form.value);
    
    // const request: LoginRequestInterface = {
    //   user: this.form.value,
    // }
    // this.store.dispatch(loginAction({request}))
  }
}