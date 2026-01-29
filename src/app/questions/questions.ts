// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-questions',
//   imports: [],
//   templateUrl: './questions.html',
//   styleUrl: './questions.scss',
// })
// export class Questions {

// }

// questionnaire.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../api-services/auth-service';
import { QuestionnaireService } from '../api-services/question-service';

interface Question {
  id: number;
  text: string;
  type: 'text' | 'radio' | 'checkbox';
  options?: string[];
}

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>Questionnaire</h2>
        <button (click)="logout()" class="btn-logout">Logout</button>
      </div>
      <div class="card">
        <div *ngIf="!submitted">
          <div *ngFor="let q of questions" class="question">
            <h3>{{ q.id }}. {{ q.text }}</h3>
            <div [ngSwitch]="q.type">
              <input *ngSwitchCase="'text'" type="text" [(ngModel)]="answers[q.id]" class="text-input">
              <div *ngSwitchCase="'radio'">
                <label *ngFor="let opt of q.options" class="radio-label">
                  <input type="radio" [name]="'q'+q.id" [value]="opt" [(ngModel)]="answers[q.id]">
                  {{ opt }}
                </label>
              </div>
              <div *ngSwitchCase="'checkbox'">
                <label *ngFor="let opt of q.options" class="checkbox-label">
                  <input type="checkbox" [value]="opt" (change)="onCheckboxChange(q.id, opt, $event)">
                  {{ opt }}
                </label>
              </div>
            </div>
          </div>
          <button (click)="submit()" class="btn-primary">Submit Answers</button>
          <p class="error" *ngIf="error">{{ error }}</p>
        </div>
        <div *ngIf="submitted" class="success">
          <h3>✓ Thank you!</h3>
          <p>Your answers have been saved successfully.</p>
          <button (click)="reset()" class="btn-secondary">Submit Another Response</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    h2 { margin: 0; color: #333; }
    .btn-logout { padding: 0.5rem 1rem; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .question { margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #eee; }
    .question:last-of-type { border-bottom: none; }
    h3 { color: #333; margin-bottom: 1rem; }
    .text-input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
    .radio-label, .checkbox-label { display: block; margin: 0.5rem 0; cursor: pointer; }
    input[type="radio"], input[type="checkbox"] { margin-right: 0.5rem; }
    .btn-primary, .btn-secondary { padding: 0.75rem 2rem; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; margin-top: 1rem; }
    .btn-primary { background: #007bff; color: white; }
    .btn-primary:hover { background: #0056b3; }
    .btn-secondary { background: #28a745; color: white; }
    .btn-secondary:hover { background: #1e7e34; }
    .success { text-align: center; padding: 2rem; }
    .success h3 { color: #28a745; font-size: 2rem; }
    .error { color: #dc3545; margin-top: 1rem; }
  `]
})
export class QuestionnaireComponent implements OnInit {
  questions: Question[] = [
    { id: 1, text: 'What is your full name?', type: 'text' },
    { id: 2, text: 'How satisfied are you with our service?', type: 'radio', options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] },
    { id: 3, text: 'Which features do you use most?', type: 'checkbox', options: ['Dashboard', 'Reports', 'Analytics', 'Settings', 'API'] },
    { id: 4, text: 'What improvements would you suggest?', type: 'text' }
  ];

  answers: any = {};
  submitted = false;
  error = '';

  constructor(
    private authService: AuthService,
    private questionnaireService: QuestionnaireService,
    private router: Router
  ) {}

  ngOnInit() {
    this.questions.forEach(q => {
      if (q.type === 'checkbox') this.answers[q.id] = [];
    });
  }

  onCheckboxChange(questionId: number, option: string, event: any) {
    if (!this.answers[questionId]) this.answers[questionId] = [];
    if (event.target.checked) {
      this.answers[questionId].push(option);
    } else {
      const idx = this.answers[questionId].indexOf(option);
      if (idx > -1) this.answers[questionId].splice(idx, 1);
    }
  }

  submit() {
    this.error = '';
    this.questionnaireService.submitAnswers({ answers: this.answers }).subscribe({
      next: () => this.submitted = true,
      error: (err) => this.error = err.error.message || 'Failed to submit answers'
    });
  }

  reset() {
    this.submitted = false;
    this.answers = {};
    this.questions.forEach(q => {
      if (q.type === 'checkbox') this.answers[q.id] = [];
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}





