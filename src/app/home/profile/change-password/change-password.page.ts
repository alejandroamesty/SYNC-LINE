import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';
import { SaveButtonComponent } from 'src/components/buttons/save-button/save-button.component';
import { BorderInputComponent } from 'src/components/inputs/border-input/border-input.component';
import { ActionInputComponent } from 'src/components/inputs/action-input/action-input.component';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.page.html',
	styleUrls: ['./change-password.page.scss'],
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
		ActionInputComponent
	]
})
export class ChangePasswordPage implements OnInit {
	currentPassword: string = '';
	newPassword: string = '';
	confirmPassword: string = '';
	inputValue: string = '';

	constructor(private _location: Location) {}

	ngOnInit() {}

	uploadingTrack: boolean = false;

	async goBack() {
		this._location.back();
	}

	async handleSave() {
		console.log('Save button clicked');
		if (this.newPassword !== this.confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		if (this.newPassword.length < 8) {
			alert('Password must be at least 8 characters long');
			return;
		}
		fetch('https://synclineserver.onrender.com/auth/changePassword', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({
				oldPassword: this.currentPassword,
				newPassword: this.newPassword
			})
		}).then((response) => {
			if (response.status === 200) {
				alert('Password changed successfully');
				this._location.back();
			} else {
				alert('Wrong password');
			}
		});
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

	onEdit() {
		console.log('Edit button clicked');
	}

	onSave(value: string) {
		this.inputValue = value; // Update the value if needed
	}
}
