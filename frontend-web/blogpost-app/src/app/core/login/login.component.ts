import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { User } from '../../shared/models/User.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginFailed:boolean = false;
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  loginService : AuthServiceService = inject(AuthServiceService);
  loginForm: FormGroup = this.fb.group({
    email: ['email', Validators.required],
    password: ['password', Validators.required],
  });

  onSubmit() {
    const user: User = {
      ...this.loginForm.value
    };
    
    this.loginFailed = !this.loginService.login(user.email, user.password);

    if (!this.loginFailed){
      this.loginForm.reset();
      this.router.navigate(["/posts"])
    }
  }
}

