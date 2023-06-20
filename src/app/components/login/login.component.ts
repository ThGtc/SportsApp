import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {StorageService} from "../../_services/storage.service";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: User = {
    pseudo: '',
    password: '',
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const {pseudo, password} = this.login;

    this.authService.login(pseudo, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

}
