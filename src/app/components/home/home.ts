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
  guests: number = 0;
  

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
      children: [0, Validators.max(this.guests > 0 ? this.guests -1 : 0)],
      dietaryReqs: ['omni'],
      requests: [''],
      ceremony: [false],
      dinner: [false],
      capriDayTrip: [false],
      morningAfter: [false],
    });

    form.get('attending')?.valueChanges.subscribe(val => {
      const value = val?.toString() ?? false;
      // this.showRegistrations = val ? val : true;
      if(value.toString() === 'false' ) {
        console.log('val is false');
        form.get('guests')?.reset();
        form.get('ceremony')?.patchValue(false);
        form.get('dinner')?.patchValue(false);
        form.get('capriDayTrip')?.patchValue(false);
        form.get('morningAfter')?.patchValue(false);
        this.showRegistrations = false;
      }
      else {
        console.log('val is true');
        this.showRegistrations = true;
      }
    });

    form.get('guests')?.valueChanges.subscribe(guests => {
      this.guests = guests ? guests : 0;
    })

    // form.get('children')?.hasError('max')

    form.valueChanges.subscribe(val => {
      console.log(val, form);
    })

    return form;
  }

  reset(form: FormGroup) {
    
  }
}
