import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';
import { SaveButtonComponent } from 'src/components/buttons/save-button/save-button.component';
import { BorderInputComponent } from 'src/components/inputs/border-input/border-input.component';
import { ActionInputComponent } from 'src/components/inputs/action-input/action-input.component';
import { MatIconModule } from '@angular/material/icon';

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
		ActionInputComponent,
		MatIconModule
	]
})
export class EditAccountPage implements OnInit {
	icon: string = 'assets/images/IMG_2751.png';
	email: string = '';
	currentPassword: string = '';
	newPassword: string = '';
	confirmPassword: string = '';
	inputValue: string = '';
	isEditable: boolean = false;

	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

	constructor(private _location: Location) {
		this.icon = localStorage.getItem('pfp') || 'assets/images/icon.png';
	}

	ngOnInit() {}

	async goBack() {
		this._location.back();
	}

	async handleSave() {
		this._location.back();
	}

	updateEmail(event: string) {
		this.email = event;
		fetch('https://synclineserver.onrender.com/profile/edit', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({
				email: this.email,
				username: localStorage.getItem('username') || '',
				url: localStorage.getItem('pfp') || ''
			})
		}).then((response) => {
			if (response.status === 200) {
				alert('Email updated successfully');
				localStorage.setItem('email', this.email);
			} else {
				response.json().then((data) => {
					alert(data.message);
				});
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
		console.log('Saved value:', value);
		fetch('https://synclineserver.onrender.com/profile/edit', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({
				email: localStorage.getItem('email') || '',
				username: value,
				url: localStorage.getItem('pfp') || ''
			})
		}).then((response) => {
			if (response.status === 200) {
				alert('Username updated successfully');
				localStorage.setItem('username', value);
			} else {
				response.json().then((data) => {
					alert(data.message);
				});
			}
		});
	}

	onEditEmail() {
		console.log('Edit email button clicked');
	}

	toggleEdit() {
		console.log('Toggle edit mode');
		this.isEditable = true;
		this.fileInput.nativeElement.click();
	}

	save() {
		console.log('Save changes');
		this.isEditable = false;
	}

	onFileSelected(event: any) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e: any) => {
				this.icon = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	}
}
