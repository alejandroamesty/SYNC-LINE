import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { StatusItemComponent } from 'src/components/items/status-item/status-item.component';
import { SpecialInputComponent } from 'src/components/inputs/special-input/special-input.component';
import { MyStatusItemComponent } from 'src/components/items/my-status-item/my-status-item.component';
import { CustomModalComponent } from 'src/components/modals/custom-modal/custom-modal.component';
import { SimpleInputComponent } from 'src/components/inputs/simple-input/simple-input.component';
import { RoundButtonComponent } from '../../../components/buttons/round-button/round-button.component';
import { SendButtonComponent } from '../../../components/chat/send-button/send-button.component';

@Component({
	selector: 'app-updates',
	templateUrl: './updates.page.html',
	styleUrls: ['./updates.page.scss'],
	standalone: true,
	imports: [
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		CommonModule,
		FormsModule,
		StatusItemComponent,
		SpecialInputComponent,
		MyStatusItemComponent,
		CustomModalComponent,
		SimpleInputComponent,
		RoundButtonComponent,
		SendButtonComponent
	]
})
export class UpdatesPage implements OnInit, AfterViewInit {
	@Output() scrollUp = new EventEmitter<void>();
	@Output() scrollDown = new EventEmitter<void>();
	@ViewChild(CustomModalComponent, { static: false }) customModal:
		| CustomModalComponent
		| undefined;

	defaultTitle: string = 'Choose a photo to upload';
	defaultSubtitle: string = 'Open your gallery';
	selectedFile: File | null = null;

	userStatus: any = {
		id: 'testid',
		nombre: 'Alejandro Ávila',
		time: 'Add to status'
	};

	recentStatus: Array<{
		id: string;
		nombre: string;
		time: string;
		url: string;
		statuses: Array<{
			imageUrl: string;
			time: string;
		}>;
	}> = [
		{
			id: '1',
			nombre: 'Prof. Genyelbert',
			time: '16m ago',
			statuses: [
				{ imageUrl: 'assets/images/IMG_2751.png', time: 'Just now' },
				{ imageUrl: 'assets/images/IMG_2751.png', time: '1 hour ago' },
				{ imageUrl: 'assets/images/IMG_2751.png', time: '3 hours ago' },
				{ imageUrl: 'assets/images/IMG_2751.png', time: '6 hours ago' }
			],
			url: 'assets/images/IMG_2751.png'
		}
	];

	filteredRecentStatus = this.recentStatus;

	searchValue: string = '';
	newTitle: string = '';
	newDescription: string = '';
	openCustomModal: boolean = false;

	constructor(private router: Router) {
		this.handleRefresh();
	}

	handleRefresh() {
		fetch('http://localhost:8000/status', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token') || ''
			}
		})
			.then((response) => {
				return response.json();
			})
			.then(
				(data: {
					statuses: Array<{
						username: string;
						url: string;
						statuses: Array<{
							id: string;
							content: string;
							description: string;
							timestamp: string; // (Date().toISOString()) need to convert to 'x time ago' format
						}>;
					}>;
				}) => {
					console.log(data);
					const username = localStorage.getItem('username') || '';
					this.recentStatus = [];
					this.userStatus = null;

					data.statuses.forEach((status) => {
						let newTimestamp = 'No status';
						if (status.statuses.length > 0) {
							newTimestamp = new Date(
								status.statuses[0].timestamp
							).toLocaleTimeString('en-US', {
								hour: 'numeric',
								minute: 'numeric',
								hour12: true
							});
						}
						const statusObj = {
							id: status.username,
							nombre: status.username,
							time: newTimestamp,
							statuses: status.statuses.map((status) => {
								const newTimestamp = new Date(status.timestamp).toLocaleTimeString(
									'en-US',
									{
										hour: 'numeric',
										minute: 'numeric',
										hour12: true
									}
								);
								return {
									imageUrl: status.content,
									// convert timestamp to 'x time ago' format
									time: newTimestamp
								};
							}),
							url: status.url
						};

						if (status.username === username) {
							this.userStatus = statusObj;
						} else {
							this.recentStatus.push(statusObj);
						}
					});

					this.filteredRecentStatus = this.recentStatus;
				}
			);
	}

	ngOnInit() {}

	ngAfterViewInit(): void {
		this.moveModalToBody();
	}

	onScroll(event: CustomEvent): void {
		if (event.detail.deltaY > 0) {
			this.scrollDown.emit();
		} else {
			this.scrollUp.emit();
		}
	}

	handleStatusPress(id: string) {
		let status = this.recentStatus.find((status) => status.id === id) || this.userStatus;
		console.log(status);
		if (!status?.statuses || Object.keys(status?.statuses).length === 0) return;
		this.router.navigate(['status'], {
			state: {
				userName: status?.nombre || '',
				userIcon: status?.url || 'assets/images/icon.png',
				status: status?.statuses || []
			}
		});
	}

	handleInputValue(value: string): void {
		this.searchValue = value;
		this.filterStatuses();
	}

	openModal(event: any) {
		this.openCustomModal = true;
		this.moveModalToBody();
	}

	closeModal(event: any) {
		this.openCustomModal = false;
		this.moveModalToBody();
	}

	private filterStatuses(): void {
		const search = this.searchValue.toLowerCase();

		this.filteredRecentStatus = this.recentStatus.filter((status) =>
			status.nombre.toLowerCase().includes(search)
		);
	}

	private moveModalToBody() {
		if (this.customModal) {
			const modalElement = document.querySelector(
				'app-custom-modal#photo-modal'
			) as HTMLElement;
			if (modalElement) {
				if (this.openCustomModal) {
					document.body.appendChild(modalElement);
					modalElement.style.display = 'block';
				} else {
					if (modalElement.parentElement === document.body) {
						modalElement.style.display = 'none';
					}
				}
			}
		}
	}

	handleTitleChange(event: string) {
		this.newTitle = event;
	}

	handleDescriptionChange(event: string) {
		this.newDescription = event;
	}

	handleAddPress(id: string) {
		this.openCustomModal = true;
		this.moveModalToBody();
		console.log('Add pressed:', id);
	}

	handleClick() {
		const fileInput = document.getElementById('fileInput') as HTMLElement;
		fileInput.click();
	}

	handleFileChange(event: any) {
		const file = event.target.files[0];
		if (file) {
			this.selectedFile = file;
			this.defaultTitle = file.name;
			this.defaultSubtitle = 'Ready to hit the status';
		}
	}

	handleAddStatus(event: any) {
		const formData = new FormData();
		console.log('Adding status?');
		if (!this.selectedFile) return;
		formData.append('file', this.selectedFile);
		console.log('Adding status:');
		fetch('http://localhost:8000/upload', {
			method: 'POST',
			headers: {
				Authorization: localStorage.getItem('token') || ''
			},
			body: formData
		})
			.then((response) => {
				return response.json();
			})
			.then((data: { message: string; url: string }) => {
				console.log(data);
				fetch('http://localhost:8000/status', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('token') || ''
					},
					body: JSON.stringify({
						content: data.url,
						description: 'No description'
					})
				})
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						alert(data.message);
						this.handleRefresh();
						this.openCustomModal = false;
						this.moveModalToBody();
					});
			});
	}

	handleCancelStatus(event: any) {}
}
