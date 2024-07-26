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
	email: string = '';
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
}
