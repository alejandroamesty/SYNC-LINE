import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GroupContactItemComponent } from './group-contact-item/group-contact-item.component';

interface Contact {
	id: string;
	username: string;
	status: string;
	profilePicture: string;
}

@Component({
	selector: 'app-group-contact-list',
	standalone: true,
	templateUrl: './group-contact-list.component.html',
	styleUrls: ['./group-contact-list.component.scss'],
	imports: [CommonModule, IonicModule, GroupContactItemComponent]
})
export class GroupContactListComponent implements OnChanges {
	@Input() contacts: Contact[] = [];
	@Output() onDelete = new EventEmitter<string>();

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
}
