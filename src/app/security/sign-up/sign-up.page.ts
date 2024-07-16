import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { BorderInputComponent } from 'src/components/border-input/border-input.component';
import { SaveButtonComponent } from 'src/components/save-button/save-button.component';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    BorderInputComponent,
    SaveButtonComponent,
    ControlButtonComponent,
  ],
})
export class SignUpPage implements OnInit {
  constructor(private router: Router) {}
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  fetching: boolean = false;
  ngOnInit() {}

  navigateToSignIn() {
    this.router.navigate(['sign-in']);
  }

  navigateToStartScreen() {
    this.router.navigate(['start-screen']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['forgot-password']);
  }

  handleEmailChange(event: any) {
    this.email = event;
  }

  handlePasswordChange(event: any) {
    this.password = event;
  }

  handleConfirmPasswordChange(event: any) {
    this.confirmPassword = event;
  }

  navigateToHome() {
    if (this.email === '' || this.password === '' || this.password.length < 8) {
      console.error('Invalid email or password');
      return;
    }
    //regex for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      console.error('Invalid email');
      return;
    }
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    if (this.fetching) return;
    this.fetching = true;
    fetch(`https://beatsyncserver.onrender.com/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          this.fetching = false;
          this.router.navigate(['sign-in']);
        } else {
          this.fetching = false;
          console.error('Not able to register user');
        }
      })
      .catch((error) => {
        this.fetching = false;
        console.error('Error while registering user', error);
      });
  }
}
