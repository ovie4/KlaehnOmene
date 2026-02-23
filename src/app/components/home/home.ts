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
  showRegistrations: boolean = true;

  ceremonyRsvp: boolean = false;
  dinnerRsvp: boolean = false;
  morningRsvp: boolean = false;
  capriDayTripRsvp: boolean = false;
  

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
      attending: [true, Validators.required],
      guests: [0],
      dietaryReqs: ['omni'],
      requests: [''],
      ceremony: [false],
      dinner: [false],
      capriDayTrip: [false],
      morningAfter: [false],
    });

    form.get('attending')?.valueChanges.subscribe(val => {
      console.log(val);
      if(!val) {
        form.get('guests')?.reset();
        form.get('ceremony')?.patchValue(false);
        form.get('dinner')?.patchValue(false);
        form.get('capriDayTrip')?.patchValue(false);
        form.get('morningAfter')?.patchValue(false);
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
