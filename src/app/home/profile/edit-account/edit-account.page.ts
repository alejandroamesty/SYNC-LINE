import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';
import { SaveButtonComponent } from 'src/components/buttons/save-button/save-button.component';
import { BorderInputComponent } from 'src/components/inputs/border-input/border-input.component';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.page.html',
  styleUrls: ['./edit-account.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ControlButtonComponent,
    SaveButtonComponent,
    BorderInputComponent,
  ],
})
export class EditAccountPage implements OnInit {
  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private _location: Location) {}

  ngOnInit() {}

  uploadingTrack: boolean = false;

  async goBack() {
    this._location.back();
  }

  async handleSave() {
    if (
      !this.email.trim() &&
      (!this.currentPassword.trim() ||
        !this.newPassword.trim() ||
        !this.confirmPassword.trim())
    ) {
      console.log('Please fill out all fields');
      return;
    }

    let updatingEmail = { going: false, success: false };
    let updatingPassword = { going: false, success: false };

    if (this.email.trim()) {
      updatingEmail = { going: true, success: false };
      fetch(`https://beatsyncserver.onrender.com/update/email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          newEmail: this.email,
        }),
      }).then((response) => {
        if (response.status === 200) {
          console.log('Email updated');
          this._location.back();
          updatingEmail.success = true;
        } else {
          response.json().then((data) => {
            console.error(data.message);
          });
        }
      });
      return;
    }

    if (this.currentPassword.trim()) {
      if (this.currentPassword === this.newPassword) {
        console.log('Passwords cant be the same');
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        console.log('Passwords dont match');
        return;
      }

      if (this.newPassword.length < 8) {
        console.log('Password must be at least 8 characters');
        return;
      }

      updatingPassword = { going: true, success: false };

      await fetch(`https://beatsyncserver.onrender.com/update/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          oldPassword: this.currentPassword,
          newPassword: this.newPassword,
        }),
      }).then((response) => {
        if (response.status === 200) {
          console.log('Password updated');
          updatingPassword.success = true;
        } else {
          response.json().then((data) => {
            console.error(data.message);
          });
        }
      });
    }
    if (
      (updatingEmail.going && updatingEmail.success) ||
      !updatingEmail.going
    ) {
      if (
        (updatingPassword.going && updatingPassword.success) ||
        !updatingPassword.going
      ) {
        this._location.back();
      }
    }
  }

  updateEmail(event: string) {
    this.email = event;
  }

  verifyPassword(event: string) {
    this.currentPassword = event;
  }

  insertNewPassword(event: string) {
    this.newPassword = event;
  }

  confirmNewPassword(event: string) {
    this.confirmPassword = event;
  }
}
