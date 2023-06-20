export class Activity {
  id?: any;
  postedBy?: any;
  title?: string;
  sport?: any;
  duration?: number;
  durationDetail?: { hour?: number; minute?: number; second?: number; };
  distance?: number;
  description?: string;
  activityDate?: Date;
  relatedPic?: string;
  isPrivate?: boolean;
}
