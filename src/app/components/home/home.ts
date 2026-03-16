import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RsvpService } from '../../api-services/rsvp-service';
import { Guest } from '../../models/guest';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

  rsvpForm!: FormGroup;
  guestsArrayForm!: FormArray;
  guests: Guest[] = [];

  showInitialRsvp: boolean = true;
  showRegistrations: boolean = true;

  ceremonyRsvp: boolean = false;
  dinnerRsvp: boolean = false;
  morningRsvp: boolean = false;
  capriDayTripRsvp: boolean = false;
  guestNum: number = 0;
  

  fb = inject(FormBuilder);
  rsvpService = inject(RsvpService);

  ngOnInit() {
    this.rsvpForm = this.createRsvpForm();
    this.guestsArrayForm = this.fb.array([]);
  }

  onSubmit() {
    console.log('submitted', this.rsvpForm);
    this.rsvpService.submitRsvp(this.rsvpForm.value).pipe().subscribe(res => {
      console.log(res);
      if(res.message === 'Rsvp saved successfully') {
        if(res.data.attending) {
          alert('Thank you for responding! We look forward to celebrating with you!');
        }
        else {
          alert('Thank you for responding! We understand that you cannot make it, and we hope to enjoy your company sometime very soon!')
        }
        this.reset(this.rsvpForm);
      }
    });
  }

  onContinue() {
    this.showRegistrations = true;
  }

  createRsvpForm() {
    // let guestsForm = this.fb.array([]);
    let form = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      attending: [true, Validators.required],
      guestNumber: [0],
      guests: this.fb.array([]),
      requests: [''],
      ceremony: [false],
      dinner: [false],
      capriDayTrip: [false],
      morningAfter: [false],
    });

    form.valueChanges.subscribe(val => console.log(val))

    form.get('attending')?.valueChanges.subscribe(val => {
      const value = val?.toString() ?? false;
      // this.showRegistrations = val ? val : true;
      if(value.toString() === 'false' ) {
        console.log('val is false');
        form.get('guestNumber')?.reset();
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

    form.get('guestNumber')?.valueChanges.subscribe(guests => {
      console.log(this.guestNum);
      this.guestNum = guests ? guests : 0;
      // if (this.guestNum > 0) {
      //   form.get('children')?.setValidators(Validators.max(this.guestNum > 0 ? this.guestNum -1 : 0));
      // }
      this.resetGuests();
      console.log(this.rsvpForm.get('guests'));
      for (let i = 0; i < guests!; i++) {
        // let g: Guest = {
        //   name: '',
        //   dietaryReq: '',
        //   isChild: false,
        //   childAge: 0,
        //   menu: ''
        // };
        // this.guests.push(g);       
        (this.rsvpForm.get('guests') as FormArray)?.push(this.createGuestForm()); 
      };
      // this.guestsArrayForm = this.fb.array(this.guests);
      console.log(this.guestsArrayForm);
      // this.rsvpForm.get('guests')?.patchValue(this.guestsArrayForm);
      console.log(this.rsvpForm.get('guests'));
    })

    // form.get('children')?.hasError('max')

    form.valueChanges.subscribe(val => {
      // console.log(val, form);
    })

    return form;
  }

  createGuestForm() {
    let form = this.fb.group({
      guestName: [''],
      dietaryReq: [''],
      isChild: [false],
      childAge: [0],
      menu: ['']
    });
    return form;
  }

  reset(form: FormGroup) {
    form.get('email')?.patchValue('');
    form.get('name')?.patchValue('');
    form.get('guests')?.reset();
    form.get('children')?.reset();
    form.get('ceremony')?.patchValue(false);
    form.get('dinner')?.patchValue(false);
    form.get('capriDayTrip')?.patchValue(false);
    form.get('morningAfter')?.patchValue(false);
  }

  resetGuests() {
    let ctrl = this.rsvpForm.get('guests') as FormArray;
    ctrl.clear();
  }

  get guestControls() {
    return this.rsvpForm.get('guests') as FormArray;
  }
}
