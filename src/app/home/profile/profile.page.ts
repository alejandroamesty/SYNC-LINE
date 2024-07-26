import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
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
		ConfirmationModalComponent
	]
})
export class ProfilePage implements OnInit, AfterViewInit {
	showModal: boolean = false;
	showDeleteModal: boolean = false;
	fetching: boolean = false;
	image: string = '';
	name: string = 'Alejandro Ávila';
	userType: string = 'Disponible';

	constructor(private router: Router) {}

	ngOnInit() {}

	ngAfterViewInit() {
		this.moveConfirmationModalToBody('logoutModal', this.showModal);
		this.moveConfirmationModalToBody('deleteModal', this.showDeleteModal);
	}

	handleLogoutPress() {
		this.showModal = true;
		this.moveConfirmationModalToBody('logoutModal', this.showModal);
	}

	handleDeletePress() {
		this.showDeleteModal = true;
		this.moveConfirmationModalToBody('deleteModal', this.showDeleteModal);
	}

	handleDeleteCancel() {
		this.showDeleteModal = false;
		this.moveConfirmationModalToBody('deleteModal', this.showDeleteModal);
	}

	handleDeleteAccept() {
		this.showDeleteModal = false;
		this.router.navigate(['start-screen']);
		this.moveConfirmationModalToBody('deleteModal', this.showDeleteModal);
	}

	handleCancel() {
		this.showModal = false;
		this.moveConfirmationModalToBody('logoutModal', this.showModal);
	}

	handleAccept() {
		this.showModal = false;
		localStorage.clear();
		this.router.navigate(['start-screen']);
		this.moveConfirmationModalToBody('logoutModal', this.showModal);
	}

	navigateToUpload() {
		this.router.navigate(['upload-music']);
	}

	navigateToEdit() {
		this.router.navigate(['edit-account']);
	}

	navigateToChangePassword() {
		this.router.navigate(['change-password']);
	}

	private moveConfirmationModalToBody(modalId: string, isVisible: boolean) {
		const confirmationModalElement = document.querySelector(
			`app-confirmation-modal#${modalId}`
		) as HTMLElement;
		if (confirmationModalElement) {
			if (isVisible) {
				document.body.appendChild(confirmationModalElement);
				confirmationModalElement.style.display = 'block';
			} else {
				if (confirmationModalElement.parentElement === document.body) {
					confirmationModalElement.style.display = 'none';
				}
			}
		}
	}
}
