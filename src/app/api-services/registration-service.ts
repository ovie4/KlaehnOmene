import { Injectable } from '@angular/core';
import { UserProfile } from '../interfaces/userProfile';
import { IUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  registrations: { [email: string]: string[] } = {};
  showAuth: boolean=false;
  currentUser: IUser | null = {} as IUser;

 handleLogout(): void {
    this.currentUser = null;
    localStorage.removeItem('weddingCurrentUser');
    this.showAuth = true;
  }
  toggleRegistration(eventId: string): void {
    if (!this.currentUser) return;

    const userRegs = this.registrations[this.currentUser.email] || [];
    
    if (userRegs.includes(eventId)) {
      this.registrations[this.currentUser.email] = userRegs.filter(id => id !== eventId);
    } else {
      this.registrations[this.currentUser.email] = [...userRegs, eventId];
    }

    localStorage.setItem('weddingRegistrations', JSON.stringify(this.registrations));
  }

  
  isRegistered(eventId: string): boolean {
    if (!this.currentUser) return false;
    return (this.registrations[this.currentUser.email] || []).includes(eventId);
  }
  
}
