import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rsvp } from '../models/rsvp';

@Injectable({
  providedIn: 'root',
})
export class RsvpService {
  private apiUrl = 'http://localhost:3000/api/rsvp';

  
  constructor(private http: HttpClient) {}

  submitRsvp(rsvp: Rsvp): Observable<any> {
    console.log(rsvp);
    return this.http.post(this.apiUrl, rsvp);
  }
}
