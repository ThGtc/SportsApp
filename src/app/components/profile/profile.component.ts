import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from "../../_services/storage.service";
import {formatDate, registerLocaleData} from "@angular/common";
import localeFR from "@angular/common/locales/fr"
import {Sports} from "../../models/sports.model";
import {SportsService} from "../../services/sports.service";
import {UserService} from "../../_services/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user.model";

registerLocaleData(localeFR, "fr");

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  sports?: Sports[];
  currentUser: any;
  otherUser: any;
  isEditable = false;
  @Input() ownProfile = true;
  @Input() isLogged = !!this.storageService.getUser().id;


  constructor(private storageService: StorageService,
              private sportService: SportsService,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    switch (true) {
      case this.route.snapshot.params["id"] === undefined:
      case this.storageService.getUser().id == this.route.snapshot.params["id"]:
        this.getStorageUser();
        break;
      default:
        this.ownProfile = false;
        this.onGetUser(this.route.snapshot.params["id"]).then(r => this.currentUser = r);
    }
  }

  onGetSports() {
    this.sportService.getSports().subscribe({
      next: (sports) => {
        this.sports = sports;
      },
      error: (e) => console.error(e)
    });
  }

  async onGetUser(id: number): Promise<User> {
    this.userService.getUser(id).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.formatData();
      },
      error: (e) => console.error(e)
    });
    return this.otherUser;
  }

  editProfile() {
    this.isEditable = !this.isEditable;
  }

  onSubmit(): void {
    this.isEditable = false;
    const {id, birthDate, mail, faveSport, firstName, lastName} = this.currentUser;

    // @ts-ignore
    let choice = document?.getElementById('faveSport').selectedOptions[0].getAttribute('ng-reflect-ng-value');
    let activityId: number;
    activityId = +choice;
    let favoriteSport = this.sports?.find(x => x.id === activityId);

    const data = {firstName, lastName, mail, birthDate, favoriteSport};

    this.userService.updateUser(id, data).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.ngOnInit();
      },
      error: err => {
        console.log(err.error.message);
        console.log("FAIL");
      }
    });
  }

  formatData() {
    if (this.currentUser.email) this.currentUser.mail = this.currentUser.email;
    this.currentUser.birthDate = formatDate(this.currentUser.birthDate, 'yyyy-MM-dd', 'fr-FR');
  }

  getStorageUser() {
    this.onGetSports();
    this.currentUser = this.storageService.getUser();
    this.formatData();
  }
}
