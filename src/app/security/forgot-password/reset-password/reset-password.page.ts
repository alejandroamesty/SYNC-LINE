import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { BorderInputComponent } from 'src/components/inputs/border-input/border-input.component';
import { SaveButtonComponent } from 'src/components/buttons/save-button/save-button.component';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [
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
export class ResetPasswordPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  password: string = '';
  confirmPassword: string = '';

  navigateToSignIn() {
    if (this.password !== this.confirmPassword) {
      return;
    }
    fetch(
      `https://beatsyncserver.onrender.com/passwordRecovery/recoveryPassword`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('email'),
          code: Number(localStorage.getItem('code')), //NUMBER
          newPassword: this.password,
        }),
      }
    ).then((response) => {
      if (response.status === 200) {
        this.navCtrl.navigateForward('sign-in', {
          animated: true,
          animationDirection: 'back',
        });
      } else {
        response.json().then((data) => {
          console.log(data);
        });
      }
    });
  }

  handlePasswordChange(event: any) {
    this.password = event;
  }

  handleConfirmPasswordChange(event: any) {
    this.confirmPassword = event;
  }

  navigateToVerifyCode() {
    this.navCtrl.navigateForward('sign-in', {
      animated: true,
      animationDirection: 'back',
    });
  }
}
