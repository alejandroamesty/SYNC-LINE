import {
	Component,
	OnInit,
	ChangeDetectorRef,
	AfterViewInit,
	Output,
	EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ContactListComponent } from 'src/components/lists/contact-list/contact-list.component';
import { SpecialInputComponent } from 'src/components/inputs/special-input/special-input.component';
import { ConfirmationModalComponent } from 'src/components/modals/confirmation-modal/confirmation-modal.component';

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
		ConfirmationModalComponent
	]
})
export class ContactsPage implements OnInit, AfterViewInit {
	@Output() scrollUp = new EventEmitter<void>();
	@Output() scrollDown = new EventEmitter<void>();

	showDeleteModal: boolean = false;
	contacts = [
		{ id: '1', name: 'Alice', phoneNumber: '123-456-7890' },
		{ id: '2', name: 'Bob', phoneNumber: '987-654-3210' },
		{ id: '3', name: 'Charlie', phoneNumber: '555-666-7777' },
		{ id: '4', name: 'David', phoneNumber: '111-222-3333' },
		{ id: '5', name: 'Eve', phoneNumber: '444-555-6666' },
		{ id: '6', name: 'Frank', phoneNumber: '777-888-9999' },
		{ id: '7', name: 'Grace', phoneNumber: '000-111-2222' },
		{ id: '8', name: 'Hank', phoneNumber: '333-444-5555' },
		{ id: '9', name: 'Ivy', phoneNumber: '666-777-8888' },
		{ id: '10', name: 'Jack', phoneNumber: '999-000-1111' }
	];

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit() {}

	ngAfterViewInit() {
		this.cdr.detectChanges();
	}

	handleDelete(event: any) {
		this.showDeleteModal = true;
		this.cdr.detectChanges();
		console.log('Delete contact with id:', event);
	}

	handleAddToGroup(event: any) {
		this.showDeleteModal = true;
		this.cdr.detectChanges();
		console.log('Add contact with id to group:', event);
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
	}

	onScroll(event: CustomEvent): void {
		if (event.detail.deltaY > 0) {
			this.scrollDown.emit();
		} else {
			this.scrollUp.emit();
		}
	}
}
