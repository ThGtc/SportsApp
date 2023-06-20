import {Component, OnInit} from '@angular/core';
import {Activity} from "../../models/activity.model";
import {ActivityService} from "../../services/activity.service";
import {Sports} from "../../models/sports.model";
import {SportsService} from "../../services/sports.service";
import {StorageService} from "../../_services/storage.service";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  sports?: Sports[];
  currentUser: any;
  user?: any;

  activity: Activity = {
    title: '',
    sport: '',
    durationDetail: {hour: 0, minute: 0, second: 0},
    distance: 0,
    description: '',
    activityDate: new Date(),
    relatedPic: '',
    isPrivate: false,
  };
  submitted = false;

  constructor(private activityService: ActivityService, private sportService: SportsService,
              private storageService: StorageService, private userService: UserService) {
  }

  get duration() {
    return this.activity.durationDetail || {hour: 0, minute: 0, second: 0};
  }

  set duration(value) {
    this.activity.durationDetail = value;
  }

  ngOnInit(): void {
    this.onGetSports();
    this.onGetCurrentUsr();
  };

  onGetSports() {
    this.sportService.getSports().subscribe({
      next: (sports) => {
        this.sports = sports;
      },
      error: (e) => console.error(e)
    });
  }

  onGetCurrentUsr() {
    this.currentUser = this.storageService.getUser();
    this.userService.getUser(this.currentUser.id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (e) => console.error(e)
    });
  }

  saveActivity(): void {
    let choice: string;
    // @ts-ignore
    choice = document?.getElementById('activityChoice').selectedOptions[0].getAttribute('ng-reflect-ng-value');
    let activityId: number;
    activityId = +choice;
    // @ts-ignore
    let durationSeconds = ((3600 * this.activity.durationDetail.hour) + (this.activity.durationDetail.minute * 60) + (this.activity.durationDetail.second));

    const data = {
      title: this.activity.title,
      sport: this.sports?.find(x => x.id === activityId),
      duration: durationSeconds,
      distance: this.activity.distance,
      description: this.activity.description,
      activityDate: this.activity.activityDate,
      relatedPic: this.activity.relatedPic,
      isPrivate: this.activity.isPrivate,
      postedBy: this.user,
    };

    this.activityService.create(data)
      .subscribe({
        next: (res) => {
          console.log(data);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newActivity(): void {
    this.submitted = false;
    this.activity = {
      title: '',
      sport: '',
      durationDetail: {hour: 0, minute: 0, second: 0},
      distance: 0,
      description: '',
      activityDate: new Date(),
      relatedPic: '',
      isPrivate: false,
    };
  }

}
