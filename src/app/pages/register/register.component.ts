import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({name:this.user.name,email:this.user.email , password:this.user.password }).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        alert("you are register successfully"); 
        this.router.navigate(['/login']);
      },
      error: err => alert(' there some thing error ! ')
    });
  }


}
