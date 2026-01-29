// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
  
// }

// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from '../interfaces/i-user';
import { UserProfile } from '../interfaces/userProfile';

export const CurrentUser = Object.freeze({
  name: 'Ovie',
  password: 't123',
  email: 'ovie7@yahoo.com'
})

@Injectable({ providedIn: 'root' })
export class AuthService {
  showAuth: boolean = true;
  users: { [email: string]: IUser } = {};
  private apiUrl = 'http://localhost:3000/api';
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  currentUser: IUser | null = {} as IUser;
  registrations: { [email: string]: string[] } = {};
  isLogin = true;
  userProfiles: { [email: string]: UserProfile } = {};

  formData = {
    email: '',
    password: '',
    name: ''
  };

  constructor(private http: HttpClient) {
    if(global?.window !== undefined) {const user = window?.localStorage.getItem('user');
    if (user) this.currentUserSubject.next(JSON.parse(user));}
  }
  
  ngOnInit(): void {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      this.showAuth = false;
    }

    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    const storedRegs = localStorage.getItem('weddingRegistrations');
    if (storedRegs) {
      this.registrations = JSON.parse(storedRegs);
    }

    const storedProfiles = localStorage.getItem('weddingUserProfiles');
    if (storedProfiles) {
      this.userProfiles = JSON.parse(storedProfiles);
    }
  }

  handleAuth(): void {
    if (this.isLogin) {
      const user = CurrentUser;
      console.log(user);
      // if (user && user.password === this.formData.password) 
      if (true) {
        this.currentUser = { email: this.formData.email, name: user.name };
        localStorage.setItem('weddingCurrentUser', JSON.stringify(this.currentUser));
        this.showAuth = false;
      } else {
        alert('Invalid credentials');
      }
    } else {
      if (!this.formData.name || !this.formData.email || !this.formData.password) {
        alert('Please fill in all fields');
        return;
      }

      if (this.users[this.formData.email]) {
        alert('User already exists');
        return;
      }

      this.users[this.formData.email] = {
        password: this.formData.password,
        name: this.formData.name,
        email: this.formData.email
      };
      localStorage.setItem('weddingUsers', JSON.stringify(this.users));

      // Initialize profile for new user
      this.userProfiles[this.formData.email] = {
        dietaryPreferences: '',
        hasPlusOne: false,
        plusOneName: '',
        plusOneDietary: '',
        eventNotes: {}
      };
      localStorage.setItem('weddingUserProfiles', JSON.stringify(this.userProfiles));

      this.currentUser = { email: this.formData.email, name: this.formData.name, password: this.formData.password };
      localStorage.setItem('weddingCurrentUser', JSON.stringify(this.currentUser));
      this.showAuth = false;
    }

    this.formData = { email: '', password: '', name: '' };
  }

  handleLogout(): void {
    this.currentUser = null;
    localStorage.removeItem('weddingCurrentUser');
    this.showAuth = true;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        window?.localStorage.setItem('user', JSON.stringify(res.user));
        window?.localStorage.setItem('token', res.token);
        this.currentUserSubject.next(res.user);
      })
    );
  }

  register(email: string, password: string, name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password, name });
  }

  logout() {
    window?.localStorage.removeItem('user');
    window?.localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!window?.localStorage.getItem('token');
  }

  getToken(): string | null {
    return window?.localStorage.getItem('token');
  }
}