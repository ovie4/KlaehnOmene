// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   imports: [],
//   templateUrl: './login.html',
//   styleUrl: './login.scss',
// })
// export class Login {

// }

// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../api-services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  isLogin = true;
  email = '';
  password = '';
  name = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.error = '';
  }

  onSubmit() {
    this.error = '';
    if (this.isLogin) {
      this.authService.login(this.email, this.password).subscribe({
        next: () => this.router.navigate(['/questionnaire']),
        error: (err) => this.error = err.error.message || 'Login failed'
      });
    } else {
      this.authService.register(this.email, this.password, this.name).subscribe({
        next: () => {
          this.isLogin = true;
          this.error = 'Registration successful! Please login.';
        },
        error: (err) => this.error = err.error.message || 'Registration failed'
      });
    }
  }
}


