import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';
import { SaveButtonComponent } from 'src/components/buttons/save-button/save-button.component';
import { BorderInputComponent } from 'src/components/inputs/border-input/border-input.component';
import { ActionInputComponent } from 'src/components/inputs/action-input/action-input.component';
import { ChatMessageComponent } from 'src/components/chat/chat-message/chat-message.component';

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
		ActionInputComponent,
		ChatMessageComponent
	]
})
export class ChangePasswordPage implements OnInit {
	currentPassword: string = '';
	newPassword: string = '';
	confirmPassword: string = '';
	inputValue: string = '';
	url: string = 'https://storage.googleapis.com/syncline-8bc81.appspot.com/6637b2e1-f6d9-4183-9278-eeaebeef4283.blob?GoogleAccessId=firebase-adminsdk-sh2hh%40syncline-8bc81.iam.gserviceaccount.com&Expires=1724581418&Signature=Fn3BYPVottJgDsgbpCmyWaxVlRYPdS2AAbvn7tiMXc8TqggPasxi%2BO2OMB4IJUTw6fRFaXc7ZliUUCUP8DcFIezK161K2oagpZrjSvmxCZgVGSGpLuWZ3PqTDnOTbL5sFZAPL6vSfDN7bVDkwN9VeWOyFh90hEpyCGvOyOCWCNzqFlioJjJHfL0U0Nimn13KOq1vLVWpIxLtAK9EreQSfczwx%2Bt0yzEyrS%2FW9jof7PVZdrbu113Za1K%2BEDkHbYBOhF98IAsSaEBrBhx8dTPhAPNIxYf4DmqtJwUqXpi%2FEMXLaxHbEWNLz29I%2F4Qik5e75LbScI3gHdZJkKWRDjXokg%3D%3D';

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
