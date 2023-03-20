import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {SportsService} from "../../services/sports.service";
import {Sports} from "../../models/sports.model";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  sports?: Sports[];

  registerForm: User = {
    pseudo: '',
    firstName: '',
    lastName: '',
    mail: '',
    password: '',
    birthDate: new Date(),
    faveSport: '',
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private sportService: SportsService) {
  }

  ngOnInit(): void {
    this.onGetSports();
  };

  onGetSports() {
    this.sportService.getSports().subscribe({
      next: (sports) => {
        this.sports = sports;
      },
      error: (e) => console.error(e)
    });
  }

  onSubmit(): void {
    const {pseudo, firstName, lastName, mail, password, birthDate} = this.registerForm;

    // @ts-ignore
    let choice = document?.getElementById('activityChoice').selectedOptions[0].getAttribute('ng-reflect-ng-value');
    let activityId: number;
    activityId = +choice;
    let faveSport = this.sports?.find(x => x.id === activityId)

    this.authService.register(pseudo, firstName, lastName, mail, password, birthDate, faveSport).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }


}
