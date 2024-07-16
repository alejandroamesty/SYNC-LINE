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
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';
import { SaveButtonComponent } from 'src/components/buttons/save-button/save-button.component';
import { VerificationInputComponent } from 'src/components/inputs/verification-input/verification-input.component';

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
    this.navCtrl.navigateForward('reset-password', {
      animated: true,
      animationDirection: 'forward',
    });
  }

  handleCodeChange(event: any) {
    this.code = event;
  }
}
