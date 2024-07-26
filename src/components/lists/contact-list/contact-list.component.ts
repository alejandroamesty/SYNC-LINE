import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ContactItemComponent } from './contact-item/contact-item.component';

interface Contact {
	id: string;
	username: string;
	status: string;
	profilePicture: string;
}

@Component({
	selector: 'app-contact-list',
	standalone: true,
	templateUrl: './contact-list.component.html',
	styleUrls: ['./contact-list.component.scss'],
	imports: [CommonModule, IonicModule, ContactItemComponent]
})
export class ContactListComponent implements OnChanges {
	@Input() contacts: Contact[] = [];
	@Output() onDelete = new EventEmitter<string>();
	@Output() onAddToGroup = new EventEmitter<string>();
	@Output() onViewChat = new EventEmitter<string>();

	sortedContacts: { [key: string]: Contact[] } = {};

	ngOnChanges(changes: SimpleChanges) {
		if (changes['contacts']) {
			this.sortContacts();
		}
	}

	sortContacts() {
		this.sortedContacts = {};
		this.contacts.sort((a, b) => a.username.localeCompare(b.username));
		this.contacts.forEach((contact) => {
			const firstLetter = contact.username[0].toUpperCase();
			if (!this.sortedContacts[firstLetter]) {
				this.sortedContacts[firstLetter] = [];
			}
			this.sortedContacts[firstLetter].push(contact);
		});
	}

	handleDelete(id: string) {
		this.onDelete.emit(id);
	}

	handleAddToGroup(id: string) {
		this.onAddToGroup.emit(id);
	}

	handleViewChat(id: string) {
		this.onViewChat.emit(id);
	}
}
