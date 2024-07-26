import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	AfterViewInit,
	ViewChild,
	ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonSearchbar
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SpecialInputComponent } from 'src/components/inputs/special-input/special-input.component';
import { ChatItemComponent } from 'src/components/items/chat-item/chat-item.component';
import { SocketService } from 'src/app/services/socket-service.service';
import { SendButtonComponent } from 'src/components/chat/send-button/send-button.component';
import { DoubleStepModalComponent } from 'src/components/modals/double-step-modal/double-step-modal.component';
import { SearchInputComponent } from 'src/components/inputs/search-input/search-input.component';
import { ListComponent } from 'src/components/lists/list/list.component';
import { SimpleInputComponent } from 'src/components/inputs/simple-input/simple-input.component';
import { MatIcon } from '@angular/material/icon';

interface Friend {
	id: string;
	name: string;
	userId: string;
	checked: boolean;
}

@Component({
	selector: 'app-chats',
	templateUrl: './chats.page.html',
	styleUrls: ['./chats.page.scss'],
	standalone: true,
	imports: [
		IonSearchbar,
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		CommonModule,
		FormsModule,
		SpecialInputComponent,
		ChatItemComponent,
		SendButtonComponent,
		DoubleStepModalComponent,
		SearchInputComponent,
		ListComponent,
		SimpleInputComponent,
		MatIcon
	]
})
export class ChatsPage implements OnInit, AfterViewInit {
	@Output() scrollUp = new EventEmitter<void>();
	@Output() scrollDown = new EventEmitter<void>();
	@ViewChild(DoubleStepModalComponent, { static: false }) doubleStepModal:
		| DoubleStepModalComponent
		| undefined;
	chats: Array<{
		id: string;
		name: string;
		preview: string;
		time: string;
		icon: string;
		user: boolean;
	}> = [];
	openCustomModal: boolean = false;
	currentStep: number = 1;
	groupName: string = '';
	groupDescription: string = '';
	groupImage: File | null = null;
	newTitle: string = '';
	newDescription: string = '';
	groupIcon: string = 'assets/images/IMG_2751.png';
	isEditable: boolean = false;

	constructor(
		private router: Router,
		private socketService: SocketService,
		private cdr: ChangeDetectorRef
	) {
		this.fetchChats();

		socketService.chatMessage$.subscribe(
			(message: {
				chat: string;
				message: string;
				messageType: string;
				sender: string;
				timestamp: string;
			}) => {
				const chat = this.chats.find((chat) => chat.id === message.chat);
				if (chat) {
					chat.preview = message.message;
					chat.time = new Date(message.timestamp).toLocaleTimeString('en-US', {
						hour: 'numeric',
						minute: 'numeric',
						hour12: true
					});
					this.chats = this.chats.filter((chat) => chat.id !== message.chat);
					this.chats.unshift(chat as any);
				} else {
					// fetch chat
					this.fetchChats();
				}
			}
		);
	}

	fetchChats() {
		fetch('https://synclineserver.onrender.com/chats', {
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
				console.log(data);
				const username = localStorage.getItem('username') || '';
				this.chats = data.result.map(
					(
						chat:
							| {
									_id: string;
									user: true;
									members: Array<any>;
									message: any;
							  }
							| {
									_id: string;
									user: false;
									name: string;
									message: any;
									url: string | null;
									description: string;
							  }
					) => {
						if (chat.user) {
							const readableDate = chat.message.messageContent[0]
								? new Date(
										chat.message.messageContent[0].timestamp
									).toLocaleTimeString('en-US', {
										hour: 'numeric',
										minute: 'numeric',
										hour12: true
									})
								: '';
							const newIcon =
								chat.members[0].username === username
									? chat.members[1].url
									: chat.members[0].url;
							return {
								id: chat._id,
								name:
									chat.members[0].username === username
										? chat.members[1].username
										: chat.members[0].username,
								preview:
									chat.message.messageContent[0]?.type === 'audio'
										? 'Audio'
										: chat.message.messageContent[0]?.message,
								time: readableDate,
								icon: newIcon || '../../../assets/images/icon.png',
								user: true
							};
						} else {
							let readableDate = chat.message.messageContent[0]
								? new Date(
										chat.message.messageContent[0].timestamp
									).toLocaleTimeString('en-US', {
										hour: 'numeric',
										minute: 'numeric',
										hour12: true
									})
								: '';
							return {
								id: chat._id,
								name: chat.name,
								preview:
									chat.message.messageContent[0]?.type === 'audio'
										? 'Audio'
										: chat.message.messageContent[0]?.message,
								time: readableDate,
								icon: chat.url || '../../../assets/images/groupchat-default.png',
								user: false
							};
						}
					}
				);
			});
	}

	friends: Friend[] = [
		{ id: '1', name: 'alejandroamesty', userId: '1', checked: false },
		{ id: '2', name: 'tryzach', userId: '2', checked: false },
		{ id: '3', name: 'misa2003', userId: '3', checked: false },
		{ id: '4', name: 'geddeuldren', userId: '4', checked: false },
		{ id: '5', name: 'josemv', userId: '5', checked: false },
		{ id: '6', name: 'marcosvejega', userId: '6', checked: false },
		{ id: '7', name: 'samantha', userId: '7', checked: false }
	];

	filteredFriends = [...this.friends];

	updateFilteredItems(updatedItems: Friend[]) {
		this.filteredFriends = updatedItems;
		this.cdr.detectChanges();
	}

	ngOnInit() {}

	handleInputValue(value: string): void {
		console.log('Input value:', value);
	}

	handleChatPress(event: any) {
		console.log('Chat pressed:', event);
		this.router.navigate(['chat'], {
			queryParams: { id: event.id, url: event.icon }
		});
	}

	handleSearchTermChanged(event: string) {
		this.filteredFriends = this.friends.filter((friend) =>
			friend.name.toLowerCase().includes(event.toLowerCase())
		);
	}

	openModal() {
		this.openCustomModal = true;
		this.currentStep = 1;
		this.moveModalToBody();
	}

	closeModal() {
		this.openCustomModal = false;
		this.currentStep = 1;
		this.moveModalToBody();
	}

	ngAfterViewInit() {
		this.moveModalToBody();
	}

	onScroll(event: CustomEvent): void {
		if (event.detail.deltaY > 0) {
			this.scrollDown.emit();
		} else {
			this.scrollUp.emit();
		}
	}

	private moveModalToBody() {
		if (this.doubleStepModal) {
			const modalElement = document.querySelector('app-double-step-modal') as HTMLElement;
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

	handleGroupCreation() {
		console.log('Creating group...');
	}

	handleTitleChange(event: string) {
		this.newTitle = event;
	}

	handleDescriptionChange(event: string) {
		this.newDescription = event;
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
