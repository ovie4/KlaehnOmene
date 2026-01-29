// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class QuestionService {
  
// }

// questionnaire.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionnaireService {
  private apiUrl = 'http://localhost:3000/api/questionnaire';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  submitAnswers(answers: any): Observable<any> {
    return this.http.post(this.apiUrl, answers, { headers: this.getHeaders() });
  }

  getMyAnswers(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }
}

