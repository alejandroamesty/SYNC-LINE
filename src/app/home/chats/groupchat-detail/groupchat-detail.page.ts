import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { ListComponent } from 'src/components/lists/list/list.component';
import { SimpleInputComponent } from 'src/components/inputs/simple-input/simple-input.component';
import { CustomModalComponent } from 'src/components/modals/custom-modal/custom-modal.component';
import { SearchInputComponent } from 'src/components/inputs/search-input/search-input.component';
import { MatIcon } from '@angular/material/icon';
import { GroupContactListComponent } from 'src/components/lists/group-contact-list/group-contact-list.component';
import { ConfirmationModalComponent } from 'src/components/modals/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';

interface Contact {
	id: string;
	username: string;
	status: string;
	profilePicture: string;
}

interface Friend {
	id: string;
	name: string;
	userId: string;
	checked: boolean;
}

@Component({
	selector: 'app-groupchat-detail',
	templateUrl: './groupchat-detail.page.html',
	styleUrls: ['./groupchat-detail.page.scss'],
	standalone: true,
	imports: [
		IonButton,
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		CommonModule,
		FormsModule,
		GroupContactListComponent,
		ListComponent,
		SearchInputComponent,
		CustomModalComponent,
		SimpleInputComponent,
		MatIcon,
		ConfirmationModalComponent
	]
})
export class GroupchatDetailPage {
	constructor(
		private _location: Location,
		private navCtrl: NavController,
		private cdr: ChangeDetectorRef,
		private router: Router
	) {
		const params = this.router.getCurrentNavigation()?.extras.state;
		this.groupId = params?.['groupId'] || this.groupId;
		this.groupIcon = params?.['url'] || this.groupIcon;
		this.name = params?.['name'] || this.name;
		this.description = params?.['description'] || this.description;
		this.members = params?.['members'] || this.members;
		this.contacts = this.members.map((member) => {
			return {
				id: member.username,
				username: member.username,
				status: '',
				profilePicture: member.url || 'assets/images/icon.png'
			};
		});
		this.filteredContacts = this.contacts;
		console.log(params);
	}
	name: string = 'Group Name';
	groupId: string = '1';
	description: string = 'Group Description';
	members: Array<{ username: string; url: string | null }> = [
		{ username: 'Alice', url: 'assets/images/IMG_2751.png' },
		{ username: 'Bob', url: 'assets/images/IMG_2751.png' },
		{ username: 'Charlie', url: 'assets/images/IMG_2751.png' }
	];
	showDeleteModal: boolean = false;
	openGroupModal: boolean = false;
	selectedContactId: string | null = '';
	newTitle: string = '';
	newDescription: string = '';
	openCustomModal: boolean = false;
	isEditable: boolean = false;
	groupIcon: string = 'assets/images/IMG_2751.png';

	contacts: Contact[] = [
		{
			id: '1',
			username: 'alice123',
			status: 'Online',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{
			id: '2',
			username: 'bob456',
			status: 'Offline',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{
			id: '3',
			username: 'charlie789',
			status: 'Away',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{
			id: '4',
			username: 'david012',
			status: 'Online',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{
			id: '5',
			username: 'eve345',
			status: 'Offline',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{
			id: '6',
			username: 'frank678',
			status: 'Online',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{
			id: '7',
			username: 'grace901',
			status: 'Away',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{
			id: '8',
			username: 'hank234',
			status: 'Online',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{
			id: '9',
			username: 'ivy567',
			status: 'Offline',
			profilePicture: 'assets/images/IMG_2751.png'
		},
		{
			id: '10',
			username: 'jack890',
			status: 'Online',
			profilePicture: 'assets/images/IMG_2751.png'
		}
	];

	filteredContacts = [...this.contacts];

	friends = [
		{
			id: '1',
			name: 'alice',
			userId: '1',
			checked: false
		},
		{
			id: '2',
			name: 'bob',
			userId: '2',
			checked: false
		},
		{
			id: '3',
			name: 'charlie',
			userId: '3',
			checked: false
		},
		{
			id: '4',
			name: 'david',
			userId: '4',
			checked: false
		},
		{
			id: '5',
			name: 'eve',
			userId: '5',
			checked: false
		},
		{
			id: '6',
			name: 'frank',
			userId: '6',
			checked: false
		},
		{
			id: '7',
			name: 'grace',
			userId: '7',
			checked: false
		},
		{
			id: '8',
			name: 'hank',
			userId: '8',
			checked: false
		},
		{
			id: '9',
			name: 'ivy',
			userId: '9',
			checked: false
		},
		{
			id: '10',
			name: 'jack',
			userId: '10',
			checked: false
		}
	];

	filteredFriends = [...this.friends];

	updateFilteredItems(updatedItems: Friend[]) {
		this.filteredFriends = updatedItems;
		// this.cdr.detectChanges();
	}

	// Función para navegar a la pantalla de chat
	goToChat() {
		this._location.back();
	}

	// Función para editar el grupo
	editGroup() {
		this.openGroupModal = true;
	}

	handleTitleChange(event: string) {
		this.newTitle = event;
	}

	handleDescriptionChange(event: string) {
		this.newDescription = event;
	}

	handleDeleteAccept(event: any) {
		this.showDeleteModal = false;
		this.cdr.detectChanges();
		const yourUsername = localStorage.getItem('username');
		if (yourUsername === this.selectedContactId) {
			return alert("You can't delete yourself from the group");
		}
		fetch('https://synclineserver.onrender.com/group/removeMember', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({
				groupId: this.groupId,
				member: this.selectedContactId
			})
		}).then((response) => {
			if (response.status === 200) {
				alert('User removed from group');
				this.members = this.members.filter(
					(member) => member.username !== this.selectedContactId
				);
				this.contacts = this.members.map((member) => {
					return {
						id: member.username,
						username: member.username,
						status: '',
						profilePicture: member.url || 'assets/images/icon.png'
					};
				});

				this.filteredContacts = this.contacts;
			} else {
				alert('You are not authorized to remove this user');
			}
		});
	}

	handleDeleteCancel(event: any) {
		this.showDeleteModal = false;
		this.cdr.detectChanges();
		// this.moveConfirmationModalToBody();
		// this.cdr.detectChanges();
		this.selectedContactId = null;
	}

	handleDelete($event: any) {
		this.showDeleteModal = true;
		this.cdr.detectChanges();
		this.selectedContactId = $event;
		// this.moveConfirmationModalToBody();
	}

	openGroupModalFunc() {
		this.openGroupModal = true;
	}

	closeGroupModalFunc(event: any) {
		this.openGroupModal = false;
	}

	doneGroupModalFunc(event: any) {
		console.log('Done');
		fetch('https://synclineserver.onrender.com/group/update', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({
				groupId: this.groupId,
				name: this.newTitle || this.name,
				description: this.newDescription || this.description,
				url: this.groupIcon || null
			})
		}).then((response) => {
			if (response.status === 200) {
				alert('Group updated');
				this.name = this.newTitle || this.name;
				this.description = this.newDescription || this.description;
			} else {
				alert('Group could not be updated');
			}
		});
	}

	handleAddFriend(event: any) {
		const members = this.filteredFriends
			.filter((friend) => friend.checked)
			.map((friend) => friend.userId);
		if (members.length === 0) {
			return alert('Please select at least one friend to add to the group');
		}
		fetch('http://localhost:8000/group/addMembers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({
				groupId: this.groupId,
				members: members
			})
		}).then((response) => {
			if (response.status === 200) {
				alert('Users added to group');
				this.contacts = this.members.map((member) => {
					return {
						id: member.username,
						username: member.username,
						status: '',
						profilePicture: member.url || 'assets/images/icon.png'
					};
				});
				this.filteredContacts = this.contacts;
			} else {
				alert('User already in group');
			}
		});
	}

	handleCancelAddFriend(event: any) {}

	openModal(event: any) {
		this.openCustomModal = true;
		fetch('https://synclineserver.onrender.com/friends', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token') || ''
			}
		}).then((response) => {
			response.json().then(
				(data: {
					friends: Array<{
						username: string;
						_id: string;
						url: string;
					}>;
				}) => {
					this.friends = data.friends.map((friend) => {
						return {
							id: friend._id,
							name: friend.username,
							userId: friend._id,
							checked: false,
							url: friend.url
						};
					});
					this.filteredFriends = this.friends;
				}
			);
		});
	}

	closeModal(event: any) {
		this.openCustomModal = false;
		// this.moveModalToBody();
	}

	handleSearchTermChanged(searchTerm: string) {
		this.filteredFriends = this.friends.filter((friend) =>
			friend.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
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
