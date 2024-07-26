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
import { ListComponent } from 'src/components/lists/list/list.component';
import { SearchInputComponent } from 'src/components/inputs/search-input/search-input.component';
import { SocketService } from 'src/app/services/socket-service.service';
import { Router } from '@angular/router';

interface Contact {
	id: string;
	username: string;
	status: string;
	profilePicture: string;
}

interface GroupChat {
	id: string;
	name: string;
	userId: string;
	checked: boolean;
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
		SimpleInputComponent,
		ListComponent,
		SearchInputComponent
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
	selectedContactId: string = '';

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

	groupChats: GroupChat[] = [
		{ id: '1', name: 'Group 1', userId: '1', checked: true },
		{ id: '2', name: 'Group 2', userId: '2', checked: true },
		{ id: '3', name: 'Group 3', userId: '3', checked: true },
		{ id: '4', name: 'Group 4', userId: '4', checked: false },
		{ id: '5', name: 'Group 5', userId: '5', checked: false },
		{ id: '6', name: 'Group 6', userId: '6', checked: false },
		{ id: '7', name: 'Group 7', userId: '7', checked: false },
		{ id: '8', name: 'Group 8', userId: '8', checked: false },
		{ id: '9', name: 'Group 9', userId: '9', checked: false },
		{ id: '10', name: 'Group 10', userId: '10', checked: false }
	];

	filteredGroupChats = [...this.groupChats];

	updateFilteredItems(updatedItems: GroupChat[]) {
		this.filteredGroupChats = updatedItems;
		this.cdr.detectChanges();
	}

	constructor(
		private cdr: ChangeDetectorRef,
		private socketService: SocketService,
		private router: Router
	) {
		this.updateFriends();
		fetch('http://localhost:8000/groups', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token') || ''
			}
		})
			.then((resonse) => {
				return resonse.json();
			})
			.then(
				(data: {
					groups: Array<{
						name: string;
						_id: string;
						membersInfo: Array<{
							username: string;
							_id: string;
						}>;
					}>;
				}) => {
					this.groupChats = data.groups.map((group) => {
						return {
							id: group._id,
							name: group.name,
							userId: group.membersInfo[0]._id,
							checked: false
						};
					});

					this.filteredGroupChats = [...this.groupChats];
				}
			);
	}

	ngOnInit() {}

	updateFriends() {
		fetch('http://localhost:8000/friends', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token') || ''
			}
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const friends: Array<{
					_id: string;
					username: string;
					friends: string[];
					url: string;
					status: any[];
				}> = data.friends;

				this.contacts = friends.map((friend) => {
					return {
						id: friend._id,
						username: friend.username,
						status: 'Offline',
						profilePicture: friend.url || 'assets/images/icon.png'
					};
				});
				this.filteredContacts = this.contacts;
				this.socketService.onlineUsers$.subscribe((users: string[]) => {
					this.contacts = this.contacts.map((contact) => {
						if (users.includes(contact.username)) {
							contact.status = 'Online';
						} else {
							contact.status = 'Offline';
						}
						return contact;
					});
					this.filteredContacts = [...this.contacts];
					this.cdr.detectChanges();
				});
			})
			.catch((error) => {
				console.error(error);
			});
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
		this.selectedContactId = event;
	}

	handleAddToGroup(event: any) {
		this.openGroupModal = true;
		this.moveGroupModalToBody();
		this.cdr.detectChanges();
		this.selectedContactId = event;
	}

	handleAddToGroupAccept(event: any) {
		const checkedGroupChats = this.filteredGroupChats.filter((groupChat) => groupChat.checked);

		checkedGroupChats.forEach((groupChat) => {
			fetch(`http://localhost:8000/group/addMembers`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token') || ''
				},
				body: JSON.stringify({
					groupId: groupChat.id,
					members: [this.selectedContactId]
				})
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					alert(data.message);
					this.updateFriends();
				})
				.catch((error) => {});
		});
	}

	handleAddToGroupCancel(event: any) {
		this.openGroupModal = false;
		this.moveGroupModalToBody();
		this.cdr.detectChanges();
	}

	handleAddFriendAccept(event: any) {
		fetch(`http://localhost:8000/friends/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({
				friend: this.newDescription
			})
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				alert(data.message);
				this.updateFriends();
			});
		this.openCustomModal = false;
		this.moveModalToBody();
		this.cdr.detectChanges();
	}

	handleAddFriendCancel(event: any) {
		this.openCustomModal = false;
		this.moveModalToBody();
		this.cdr.detectChanges();
	}

	handleViewChat(event: any) {
		this.cdr.detectChanges();
		fetch(`http://localhost:8000/chats/user?member=${event.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token') || ''
			}
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const chatId = data.chatId;
				this.router.navigate(['/chat'], {
					queryParams: {
						id: chatId,
						url: event.url
					}
				});
			});
	}

	handleDeleteCancel() {
		this.showDeleteModal = false;
		this.cdr.detectChanges();
	}

	handleDeleteAccept() {
		this.showDeleteModal = false;
		this.cdr.detectChanges();
		fetch(`http://localhost:8000/friends/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token') || ''
			},
			body: JSON.stringify({
				friend: this.selectedContactId
			})
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				alert(data.message);
				this.updateFriends();
			});
	}

	handleInputValue(value: string): void {
		console.log('Input value:', value);
		this.filteredContacts = this.contacts.filter((contact) =>
			contact.username.toLowerCase().includes(value.toLowerCase())
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

	openGroupModalFunc() {
		this.openGroupModal = true;
		this.moveGroupModalToBody();
		this.filteredGroupChats = [...this.groupChats];
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

	handleSearchTermChanged(searchTerm: string) {
		this.filteredGroupChats = this.groupChats.filter((groupChat) =>
			groupChat.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		this.cdr.detectChanges();
	}
}
