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
import { OptionCardComponent } from 'src/components/items/option-card/option-card.component';
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
  name: string = 'Alejandro Ávila';
  userType: string = 'Disponible';

  constructor(private router: Router) {
    // this.image = localStorage.getItem('pfp') || '';
    // this.name = localStorage.getItem('name') || '';
    // this.userType = localStorage.getItem('userType') || '';
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
    this.router.navigate(['start-screen']);
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
