import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, LoginComponent, RegisterComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  tab = signal<'login' | 'register'>('login');
}
