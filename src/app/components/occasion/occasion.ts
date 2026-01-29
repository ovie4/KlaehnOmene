import { Component } from '@angular/core';
import { IOccasions } from '../../interfaces/occasion';

@Component({
  selector: 'app-occasion',
  imports: [],
  templateUrl: './occasion.html',
  styleUrl: './occasion.scss',
})
export class Occasion {
 events: IOccasions[] = [
    {
      id: 'welcome',
      day: 'Thursday',
      date: 'June 15, 2025',
      title: 'Welcome Dinner',
      time: '7:00 PM',
      location: 'Sunset Terrace Restaurant',
      description: 'Casual dinner to welcome our guests'
    },
    {
      id: 'rehearsal',
      day: 'Friday',
      date: 'June 16, 2025',
      title: 'Rehearsal Dinner',
      time: '6:00 PM',
      location: 'Garden Pavilion',
      description: 'For wedding party and family'
    },
    {
      id: 'ceremony',
      day: 'Saturday',
      date: 'June 17, 2025',
      title: 'Wedding Ceremony',
      time: '4:00 PM',
      location: 'Rosewood Chapel',
      description: 'Join us as we say "I do"'
    },
    {
      id: 'reception',
      day: 'Saturday',
      date: 'June 17, 2025',
      title: 'Reception',
      time: '6:00 PM',
      location: 'Grand Ballroom',
      description: 'Dinner, dancing, and celebration'
    },
    {
      id: 'brunch',
      day: 'Sunday',
      date: 'June 18, 2025',
      title: 'Farewell Brunch',
      time: '11:00 AM',
      location: 'Hotel Garden',
      description: 'A final gathering before goodbyes'
    }
  ];
}
