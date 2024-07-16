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

import { BorderInputComponent } from 'src/components/border-input/border-input.component';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { SaveButtonComponent } from 'src/components/save-button/save-button.component';
import { VerificationInputComponent } from 'src/components/verification-input/verification-input.component';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.page.html',
  styleUrls: ['./verify-code.page.scss'],
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
    VerificationInputComponent,
  ],
})
export class VerifyCodePage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}
  code: string = '';
  navigateToForgotPassword() {
    this.navCtrl.navigateBack('forgot-password', {
      animated: true,
      animationDirection: 'back',
    });
  }

  navigateToSignUp() {
    this.navCtrl.navigateBack('sign-up', {
      animated: true,
      animationDirection: 'back',
    });
  }

  navigateToResetPassword() {
    console.log(localStorage.getItem('email'));
    console.log(this.code);
    fetch(`https://beatsyncserver.onrender.com/passwordRecovery/recoveryCode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('email'),
        code: Number(this.code),
      }),
    }).then((response) => {
      if (response.status === 200) {
        localStorage.setItem('code', this.code);
        this.navCtrl.navigateForward('reset-password', {
          animated: true,
          animationDirection: 'forward',
        });
      } else {
        response.json().then((data) => {
          console.log(data);
        });
      }
    });
  }

  handleCodeChange(event: any) {
    this.code = event;
  }
}
