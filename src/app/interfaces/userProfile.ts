export interface UserProfile {
  dietaryPreferences: string;
  hasPlusOne: boolean;
  plusOneName: string;
  plusOneDietary: string;
  eventNotes: { [eventId: string]: string };
}