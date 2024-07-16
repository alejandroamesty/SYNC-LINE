import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';
import { OptionCardComponent } from 'src/components/option-card/option-card.component';
import { ConfirmationModalComponent } from 'src/components/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ControlButtonComponent,
    OptionCardComponent,
    ConfirmationModalComponent,
  ],
})
export class ProfilePage implements OnInit {
  showModal: boolean = false;
  showDeleteModal: boolean = false;
  fetching: boolean = false;
  image: string = '';
  name: string = '';
  userType: string = '';

  constructor(private router: Router) {
    this.image = localStorage.getItem('pfp') || '';
    this.name = localStorage.getItem('name') || '';
    this.userType = localStorage.getItem('userType') || '';
  }

  ngOnInit() {}

  handleLogoutPress() {
    this.showModal = true;
  }

  handleDeletePress() {
    this.showDeleteModal = true;
  }

  handleDeleteCancel() {
    this.showDeleteModal = false;
  }

  handleDeleteAccept() {
    this.showDeleteModal = false;
    if (this.fetching) return;
    this.fetching = true;
    fetch('https://beatsyncserver.onrender.com/auth/unregister', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: localStorage.getItem('userId') }),
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.fetching = false;
        localStorage.removeItem('userId');
        this.router.navigate(['start-screen']);
      } else {
        this.fetching = false;
        console.log('Failed to delete');
      }
    });
  }

  handleCancel() {
    this.showModal = false;
  }

  handleAccept() {
    this.showModal = false;
    localStorage.clear();

    this.router.navigate(['start-screen']);
  }

  navigateToUpload() {
    this.router.navigate(['upload-music']);
  }

  navigateToEdit() {
    this.router.navigate(['edit-account']);
  }
}
