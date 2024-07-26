import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { BorderInputComponent } from 'src/components/inputs/border-input/border-input.component';
import { SaveButtonComponent } from 'src/components/buttons/save-button/save-button.component';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up-user.component.html',
	styleUrls: ['./sign-up-user.component.scss'],
	standalone: true,
	imports: [
		IonButton,
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		CommonModule,
		FormsModule,
		BorderInputComponent,
		SaveButtonComponent,
		ControlButtonComponent
	]
})
export class SignUpUserComponent implements OnInit {
	constructor(private router: Router) {
		// get the email and password from the queryParams
		const queryParams = this.router.getCurrentNavigation()?.extractedUrl.queryParams;
		if (queryParams) {
			const { email, password } = queryParams;
			this.email = email;
			this.password = password;
		}
	}
	username: string = '';
	password: string = '';
	email: string = '';
	fetching: boolean = false;
	ngOnInit() {}

	navigateToSignIn() {
		this.router.navigate(['sign-in']);
	}

	navigateToStartScreen() {
		this.router.navigate(['sign-up']);
	}

	navigateToForgotPassword() {
		this.router.navigate(['forgot-password']);
	}

	handleUserChange(event: any) {
		this.username = event;
	}

	async navigateToHome() {
		await fetch('https://synclineserver.onrender.com/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.username,
				email: this.email,
				password: this.password,
				url: null
			})
		}).then((response) => {
			if (response.status === 200) {
				this.router.navigate(['start-screen']);
			} else {
				response.json().then((data) => {
					alert('Error: ' + data.message);
				});
			}
		});
	}
}
