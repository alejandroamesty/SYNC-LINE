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
    this.navCtrl.navigateBack('sign-in', {
      animated: true,
      animationDirection: 'back',
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
