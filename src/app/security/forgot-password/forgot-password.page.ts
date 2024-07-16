import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { BorderInputComponent } from 'src/components/border-input/border-input.component';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { SaveButtonComponent } from 'src/components/save-button/save-button.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    BorderInputComponent,
    ControlButtonComponent,
    SaveButtonComponent,
  ],
})
export class ForgotPasswordPage implements OnInit {
  email: string = '';
  fetching: boolean = false;
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  handleEmailChange(event: any) {
    this.email = event;
  }

  navigateToSignIn() {
    this.navCtrl.navigateForward('sign-in', {
      animated: true,
      animationDirection: 'back',
    });
  }

  navigateToVerifyCode() {
    if (this.email === '' || this.fetching) return;
    this.fetching = true;
    fetch(
      'https://beatsyncserver.onrender.com/passwordRecovery/forgotPassword',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
        }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          this.fetching = false;
          localStorage.setItem('email', this.email);
          this.navCtrl.navigateForward('verify-code', {
            animated: true,
            animationDirection: 'forward',
          });
        } else {
          console.log('Email not sent');
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }

  navigateToSignUp() {
    this.navCtrl.navigateBack('sign-up', {
      animated: true,
      animationDirection: 'forward',
    });
  }
}
