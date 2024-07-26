import {
	Component,
	OnInit,
	ChangeDetectorRef,
	AfterViewInit,
	Output,
	EventEmitter,
	ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ContactListComponent } from 'src/components/lists/contact-list/contact-list.component';
import { SpecialInputComponent } from 'src/components/inputs/special-input/special-input.component';
import { ConfirmationModalComponent } from 'src/components/modals/confirmation-modal/confirmation-modal.component';
import { SendButtonComponent } from 'src/components/chat/send-button/send-button.component';
import { CustomModalComponent } from 'src/components/modals/custom-modal/custom-modal.component';
import { SimpleInputComponent } from 'src/components/inputs/simple-input/simple-input.component';

interface Contact {
	id: string;
	name: string;
	username: string;
	profilePicture: string;
}

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.page.html',
	styleUrls: ['./contacts.page.scss'],
	standalone: true,
	imports: [
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		CommonModule,
		FormsModule,
		ContactListComponent,
		SpecialInputComponent,
		ConfirmationModalComponent,
		SendButtonComponent,
		CustomModalComponent,
		SimpleInputComponent
	]
})
export class ContactsPage implements OnInit, AfterViewInit {
	@Output() scrollUp = new EventEmitter<void>();
	@Output() scrollDown = new EventEmitter<void>();
	@ViewChild(CustomModalComponent, { static: false }) customModal:
		| CustomModalComponent
		| undefined;
	@ViewChild(ConfirmationModalComponent, { static: false }) confirmationModal:
		| ConfirmationModalComponent
		| undefined;

	showDeleteModal: boolean = false;
	openCustomModal: boolean = false;
	openGroupModal: boolean = false;
	newTitle: string = '';
	newDescription: string = '';

	contacts: Contact[] = [
		{
			id: '1',
			name: 'Alice',
			username: 'alice123',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{ id: '2', name: 'Bob', username: 'bob456', profilePicture: 'assets/images/IMG_2751.png' },
		{
			id: '3',
			name: 'Charlie',
			username: 'charlie789',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{
			id: '4',
			name: 'David',
			username: 'david012',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{ id: '5', name: 'Eve', username: 'eve345', profilePicture: 'assets/images/IMG_2751.png' },
		{
			id: '6',
			name: 'Frank',
			username: 'frank678',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{
			id: '7',
			name: 'Grace',
			username: 'grace901',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{
			id: '8',
			name: 'Hank',
			username: 'hank234',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{ id: '9', name: 'Ivy', username: 'ivy567', profilePicture: 'assets/images/IMG_2751.png' },
		{
			id: '10',
			name: 'Jack',
			username: 'jack890',
			profilePicture: 'assets/images/IMG_2751.png'
		}
	];

	filteredContacts = [...this.contacts];

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.filteredContacts = [...this.contacts];
	}

	ngAfterViewInit() {
		this.moveModalToBody();
		this.moveConfirmationModalToBody();
		this.moveGroupModalToBody();
		this.cdr.detectChanges();
	}

	handleDelete(event: any) {
		this.showDeleteModal = true;
		this.moveConfirmationModalToBody();
		this.cdr.detectChanges();
		console.log('Delete contact with id:', event);
	}

	handleAddToGroup(event: any) {
		this.openGroupModal = true;
		this.moveGroupModalToBody();
		this.cdr.detectChanges();
		console.log('Add contact with id to group:', event);
	}

	handleViewChat(event: any) {
		this.showDeleteModal = true;
		this.moveConfirmationModalToBody();
		this.cdr.detectChanges();
		console.log('View chat with contact id:', event);
	}

	handleDeleteCancel() {
		this.showDeleteModal = false;
		this.cdr.detectChanges();
	}

	handleDeleteAccept() {
		this.showDeleteModal = false;
		this.cdr.detectChanges();
	}

	handleInputValue(value: string): void {
		console.log('Input value:', value);
		this.filteredContacts = this.contacts.filter((contact) =>
			contact.name.toLowerCase().includes(value.toLowerCase())
		);
	}

	onScroll(event: CustomEvent): void {
		if (event.detail.deltaY > 0) {
			this.scrollDown.emit();
		} else {
			this.scrollUp.emit();
		}
	}

	openModal(event: any) {
		this.openCustomModal = true;
		this.moveModalToBody();
	}

	closeModal(event: any) {
		this.openCustomModal = false;
		this.moveModalToBody();
	}

	openGroupModalFunc(event: any) {
		this.openGroupModal = true;
		this.moveModalToBody();
	}

	closeGroupModalFunc(event: any) {
		this.openGroupModal = false;
		this.moveModalToBody();
		this.cdr.detectChanges();
	}

	private moveModalToBody() {
		if (this.customModal) {
			const modalElement = document.querySelector(
				'app-custom-modal#custom-modal'
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

	private moveGroupModalToBody() {
		if (this.customModal) {
			const groupModal = document.querySelector(
				'app-custom-modal#group-modal'
			) as HTMLElement;
			if (groupModal) {
				if (this.openGroupModal) {
					document.body.appendChild(groupModal);
					groupModal.style.display = 'block';
				} else {
					if (groupModal.parentElement === document.body) {
						groupModal.style.display = 'none';
					}
				}
			}
		}
	}

	private moveConfirmationModalToBody() {
		if (this.confirmationModal) {
			const confirmationModalElement = document.querySelector(
				'app-confirmation-modal'
			) as HTMLElement;
			if (confirmationModalElement) {
				if (this.showDeleteModal) {
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

	handleTitleChange(event: string) {
		this.newTitle = event;
	}

	handleDescriptionChange(event: string) {
		this.newDescription = event;
	}
}
