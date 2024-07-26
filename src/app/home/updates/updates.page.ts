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
		SimpleInputComponent
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

	userStatus = {
		id: '10',
		nombre: 'Alejandro Ávila',
		time: 'Add to status',
		viewed: false
	};

	recentStatus = [
		{ id: '1', nombre: 'Prof. Genyelbert', time: '16m ago', viewed: false },
		{ id: '3', nombre: 'Dr. Martinez', time: '3h ago', viewed: false },
		{ id: '5', nombre: 'Prof. Mario', time: '1d ago', viewed: false }
	];

	viewedStatus = [
		{ id: '2', nombre: 'Alejandro Ávila', time: '16m ago', viewed: true },
		{ id: '4', nombre: 'José Chacón', time: '3h ago', viewed: true },
		{ id: '6', nombre: 'Prof. Jubert', time: '1d ago', viewed: true }
	];

	filteredRecentStatus = [...this.recentStatus];
	filteredViewedStatus = [...this.viewedStatus];

	searchValue: string = '';
	newTitle: string = '';
	newDescription: string = '';
	openCustomModal: boolean = false;

	constructor(private router: Router) {}

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
		console.log('Status item pressed:', id);
		this.router.navigate(['status']);
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

		this.filteredViewedStatus = this.viewedStatus.filter((status) =>
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
}
