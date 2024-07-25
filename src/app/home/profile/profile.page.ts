import { Component, OnInit } from '@angular/core';
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
export class ProfilePage implements OnInit {
	showModal: boolean = false;
	showDeleteModal: boolean = false;
	fetching: boolean = false;
	image: string | null = '';
	name: string = '';
	description: string = 'Online';

	constructor(private router: Router) {
		this.name = localStorage.getItem('username') || '';
		this.image = localStorage.getItem('pfp') || null;
		this.description = localStorage.getItem('status') || 'Online';
		if (this.image === null) {
			this.image = '../../../assets/images/icon.png';
		}
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

	async handleDeleteAccept() {
		this.showDeleteModal = false;
		const token = localStorage.getItem('token') || '';
		fetch('http://localhost:8000/auth/unregister', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token
			}
		}).then((res) => {
			if (res.status === 200) {
				console.log('Deleted account');
				localStorage.clear();
				this.router.navigate(['start-screen']);
			} else {
				alert('Failed to delete');
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
