import {Component, OnInit} from '@angular/core';
import {ActivityService} from "../../services/activity.service";
import {Activity} from "../../models/activity.model";

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent implements OnInit {

  activities?: Activity[];
  currentActivity: Activity = {};
  currentIndex = -1;
  title = '';

  constructor(private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.retrieveActivities();
  }

  retrieveActivities(): void {
    this.activityService.getAll()
      .subscribe({
        next: (data) => {
          this.activities = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveActivities();
    this.currentActivity = {};
    this.currentIndex = -1;
  }

  setActiveActivity(activity: Activity, index: number): void {
    this.currentActivity = activity;
    this.currentIndex = index;
  }

  removeAllActivities(): void {
    this.activityService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      })
  }

  searchTitle(): void {
    this.currentActivity = {};
    this.currentIndex = -1;

    this.activityService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.activities = data;
        },
        error: (e) => console.error(e)
      })
  }

}
