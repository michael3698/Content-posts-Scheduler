import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}


  login() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        console.error('Login failed', error)
        alert("Wrong Credentials")
      }
    });
  }






}
