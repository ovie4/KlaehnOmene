import { Injectable } from '@angular/core';
import { UserProfile } from '../interfaces/userProfile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userProfiles: { [email: string]: UserProfile } = {};
  currentUser: { email: string; name: string } | null = null;
  
  getUserProfile(): UserProfile {
    if (!this.currentUser) {
      return {
        dietaryPreferences: '',
        hasPlusOne: false,
        plusOneName: '',
        plusOneDietary: '',
        eventNotes: {}
      };
    }
    return this.userProfiles[this.currentUser.email] || {
      dietaryPreferences: '',
      hasPlusOne: false,
      plusOneName: '',
      plusOneDietary: '',
      eventNotes: {}
    };
  }

  updateProfile(field: keyof UserProfile, value: any): void {
    if (!this.currentUser) return;

    const profile = this.getUserProfile();
    this.userProfiles[this.currentUser.email] = {
      ...profile,
      [field]: value
    };

    localStorage.setItem('weddingUserProfiles', JSON.stringify(this.userProfiles));
  }
}
