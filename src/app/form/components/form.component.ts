import {Component, OnInit, OnDestroy} from '@angular/core'
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms'
import {map, Observable, startWith, Subscription, tap} from 'rxjs'
import { FormService } from '../services/form.service'
import { EmployeeInterface } from '../types/employee.interface'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy{

  form: FormGroup
  filteredOptions$: Observable<string[]>;
  nameSelected$: Observable<string>[];
  names: string[] = []
  users: EmployeeInterface[] = [];
  employeesSub: Subscription
  nameSub: Subscription
  

  constructor(private fb: FormBuilder, private formService: FormService) {}


  ngOnInit(): void {
    this.initializeForm()
    this.employeesSub = this.formService.getEmployees().subscribe((employees) => {
      employees.map((employee) => this.users.push(employee))
    })
  }

  initializeForm(): void {
    //INITIALIZE THE FORM
    this.form = this.fb.group({
      nameSearch: new FormControl ([''], [Validators.required]),
      startDate: new FormControl  ([''], [Validators.required]),
      endDate: new FormControl ([''], [Validators.required]),
      email: new FormControl ([''], [Validators.required, Validators.email, ]),
      message: new FormControl ([''], [Validators.required]),
    })
    //SUBSCRIBE TO NAME VALUE CHANGES AND CHECK IF IT EXIST IN THE USERS ARRAY
    this.nameSub = this.form.controls['nameSearch'].valueChanges.subscribe((value)=>{
      const existingName = this.users.filter((user)=> user.name_cyr === value);
      if(existingName.length>0){
        this.form.controls['email'].setValue(existingName[0].email)
      } else {
        this.form.controls['email'].setValue('')
      }
    })
    //MUTATES THE VALUE FROM NAME INPUT AND CALLS A FUNCTION TO MATCH THE NAMES THAT INCLUDES THE INPUT
    this.filteredOptions$ = this.form.controls['nameSearch'].valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filter(value)
      })
      );
    }

    //DECLARE FORM GETTERS TO ACCESS THEM FROM THE HTML TEMPLATE 

    get email() { return this.form.get('email'); }
    get message() { return this.form.get('message'); }
    get nameSearch() { return this.form.get('nameSearch'); }


    private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const names = this.users.map((user)=> user.name_cyr)
    return names.filter(name => name.toLowerCase().includes(filterValue));
  }


  onSubmit(): void {
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
      this.employeesSub.unsubscribe();
      this.nameSub.unsubscribe();
  }
}