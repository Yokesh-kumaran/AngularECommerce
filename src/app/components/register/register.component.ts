import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(private storageService: StorageService) {}
  onSubmit(registerForm: NgForm) {
    this.storageService.setUsers(
      registerForm.value.email,
      registerForm.value.password,
    );    
  }
}
