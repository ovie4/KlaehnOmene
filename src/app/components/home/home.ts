import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RsvpService } from '../../api-services/rsvp-service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

  rsvpForm!: FormGroup;

  showInitialRsvp: boolean = true;
  showRegistrations: boolean = false;

  ceremonyRsvp: boolean = false;
  dinnerRsvp: boolean = false;
  capriRsvp: boolean = false;
  boatingRsvp: boolean = false;
  

  fb = inject(FormBuilder);
  rsvpService = inject(RsvpService);

  ngOnInit() {
    this.rsvpForm = this.createRsvpForm();
  }

  onSubmit() {
    console.log('submitted', this.rsvpForm);
    this.rsvpService.submitRsvp(this.rsvpForm.value).pipe().subscribe(res => console.log(res));
  }

  onContinue() {
    this.showRegistrations = true;
  }

  createRsvpForm() {
    let form = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      attending: [false, Validators.required],
      guests: [0],
      dietaryReqs: [''],
      requests: [''],
      ceremony: [false],
      dinner: [false],
      boating: [false],
      capri: [false],
    });

    form.get('attending')?.valueChanges.subscribe(val => {
      console.log(val);
      if(!val) {
        form.get('guests')?.reset();
        form.get('ceremony')?.patchValue(false);
        form.get('dinner')?.patchValue(false);
        form.get('boating')?.patchValue(false);
        form.get('capri')?.patchValue(false);
        this.showRegistrations = false;
      }
      else {
        this.showRegistrations = true;
      }
    });

    form.valueChanges.subscribe(val => {
      console.log(val, form);
    })

    return form;
  }
}
