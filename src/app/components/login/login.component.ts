import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  error: string = '';
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit(loginForm: NgForm) {
    if (this.authenticationService.isValidUser(loginForm.value)) {
      this.router.navigate(['/home'], { replaceUrl: true });
    } else {
      this.error = 'Please enter valid credentials';
    }
  }
}
