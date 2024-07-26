import { Component, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
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
		ChatItemComponent
	]
})
export class ChatsPage implements OnInit {
	@Output() scrollUp = new EventEmitter<void>();
	@Output() scrollDown = new EventEmitter<void>();

	chats: Array<{
		id: string;
		name: string;
		preview: string;
		time: string;
		icon: string;
		user: boolean;
	}> = [];

	constructor(private router: Router) {
		fetch('http://localhost:8000/chats', {
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
								preview: chat.message.messageContent[0]?.message,
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
								preview: chat.message.messageContent[0]?.message,
								time: readableDate,
								icon: chat.url || '../../../assets/images/group.png',
								user: false
							};
						}
					}
				);
			});
	}

	ngOnInit() {}

	onScroll(event: CustomEvent): void {
		if (event.detail.deltaY > 0) {
			this.scrollDown.emit();
		} else {
			this.scrollUp.emit();
		}
	}

	handleInputValue(value: string): void {
		console.log('Input value:', value);
	}

	handleChatPress(event: any): void {
		this.router.navigate(['chat'], {
			queryParams: { id: event.id, url: event.icon }
		});
	}
}
