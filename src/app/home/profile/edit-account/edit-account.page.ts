import { Component, OnInit } from '@angular/core';
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
	isEditable: boolean = false; // Track if in editing state

	constructor(private _location: Location) {
		this.icon = localStorage.getItem('pfp') || 'assets/images/icon.png';
	}

	ngOnInit() {}

	uploadingTrack: boolean = false;

	async goBack() {
		this._location.back();
	}

	async handleSave() {
		this._location.back();
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

	onEdit() {
		console.log('Edit button clicked');
	}

	onSave(value: string) {
		console.log('Saved value:', value);
		this.inputValue = value; // Update the value if needed
	}

	onEditEmail() {
		console.log('Edit email button clicked');
	}

	toggleEdit(editMode: boolean) {
		console.log('Toggle edit mode');
		this.isEditable = editMode;
	}

	save() {
		console.log('Save changes');
		this.isEditable = false;
	}
}
