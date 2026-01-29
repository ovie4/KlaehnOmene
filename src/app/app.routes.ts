// import { Routes } from '@angular/router';

// export const routes: Routes = [];


// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { QuestionnaireComponent } from './questions/questions';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: '**', redirectTo: '/login' }
];