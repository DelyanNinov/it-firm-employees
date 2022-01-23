import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginData } from 'src/app/auth/types/loginData.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => this.router.navigate(['/form']))
      .catch((e) => console.log(e.message));
  }
}
