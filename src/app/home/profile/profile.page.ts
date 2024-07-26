import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';
import { OptionCardComponent } from 'src/components/items/option-card/option-card.component';
import { ConfirmationModalComponent } from 'src/components/modals/confirmation-modal/confirmation-modal.component';
import { SocketService } from 'src/app/services/socket-service.service';

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
	image: string | null = '';
	name: string = '';
	description: string = 'Online';

	constructor(
		private router: Router,
		private socketService: SocketService
	) {
		this.name = localStorage.getItem('username') || '';
		this.image = localStorage.getItem('pfp') || null;
		this.description = localStorage.getItem('status') || 'Online';
		if (this.image === null) {
			this.image = '../../../assets/images/icon.png';
		}
	}

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

	async handleDeleteAccept() {
		this.showDeleteModal = false;
		const token = localStorage.getItem('token') || '';
		fetch('https://synclineserver.onrender.com/auth/unregister', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token
			}
		}).then((res) => {
			if (res.status === 200) {
				console.log('Deleted account');
				localStorage.clear();
				this.socketService.disconnect();
				this.router.navigate(['start-screen']);
				this.moveConfirmationModalToBody('deleteModal', this.showDeleteModal);
			} else {
				alert('Failed to delete');
			}
		});
	}

	handleCancel() {
		this.showModal = false;
		this.moveConfirmationModalToBody('logoutModal', this.showModal);
	}

	handleAccept() {
		this.showModal = false;
		localStorage.clear();
		this.socketService.disconnect();
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
