import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "../../models/activity.model";
import {ActivityService} from "../../services/activity.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Sports} from "../../models/sports.model";
import {SportsService} from "../../services/sports.service";

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() authorLink = 0;
  @Input() currentActivity: Activity = {
    title: '',
    postedBy: '',
    sport: '',
    duration: 0,
    distance: 0,
    description: '',
    activityDate: new Date(),
    relatedPic: '',
    isPrivate: false,
  }

  message = '';
  sports?: Sports[];

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private sportService: SportsService) {
  }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.onGetSports();
      this.getActivity(this.route.snapshot.params["id"]);
    }

  }

  onGetSports() {
    this.sportService.getSports().subscribe({
      next: (sports) => {
        this.sports = sports;
        console.log(sports);
      },
      error: (e) => console.error(e)
    });
  }

  getActivity(id: string): void {
    this.activityService.get(id)
      .subscribe({
        next: (data) => {
          this.currentActivity = data;
        },
        error: (e) => console.error(e)
      });
  }

  updatePrivacyStatus(status: boolean): void {
    const data = {
      title: this.currentActivity.title,
      sport: {
        id: this.currentActivity.sport.id,
        title: this.currentActivity.sport.title,
        includesDistance: this.currentActivity.sport.includesDistance,
        relatedLogo: this.currentActivity.sport.relatedLogo,
      },
      duration: this.currentActivity.duration,
      distance: this.currentActivity.distance,
      description: this.currentActivity.description,
      activityDate: this.currentActivity.activityDate,
      relatedPic: this.currentActivity.relatedPic,
      isPrivate: status,
    };

    this.message = '';

    this.activityService.update(this.currentActivity.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentActivity.isPrivate = status;
          this.message = res.message ? res.message : 'La visibilité de votre activité a bien été modifiée!';
        },
        error: (e) => console.error(e)
      });
  }

  updateActivity(): void {
    this.message = '';
    this.activityService.update(this.currentActivity.id, this.currentActivity)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'L\'activité a bien été mise à jour !';
        },
        error: (e) => console.error(e)
      });
  }

  deleteActivity(): void {
    this.activityService.delete(this.currentActivity.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/activities']);
        },
        error: (e) => console.error(e)
      });
  }
}
