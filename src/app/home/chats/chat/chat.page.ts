import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChatInputComponent } from 'src/components/chat/chat-input/chat-input.component';
import { SendButtonComponent } from 'src/components/chat/send-button/send-button.component';
import { ChatMessageComponent } from 'src/components/chat/chat-message/chat-message.component';
import { CommonModule } from '@angular/common';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';
import { Location } from '@angular/common';
import { RecordButtonComponent } from 'src/components/chat/record-button/record-button.component';
import { Params, Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket-service.service';
import { group } from '@angular/animations';

interface Message {
	text: string; // URL to audio file or text message
	time: string;
	isSent: boolean;
	date: string;
	isAudio: boolean; // New field to distinguish audio messages
	user: boolean;
	username?: string;
	timestamp: string; // Add timestamp to the interface for sorting
}

@Component({
	selector: 'app-chat',
	standalone: true,
	templateUrl: './chat.page.html',
	styleUrls: ['./chat.page.scss'],
	imports: [
		IonicModule,
		ChatInputComponent,
		SendButtonComponent,
		ChatMessageComponent,
		CommonModule,
		ControlButtonComponent,
		RecordButtonComponent
	]
})
export class ChatPage implements AfterViewInit {
	icon = 'assets/images/IMG_2751.png';
	yourUsername: string;
	username = 'John Doe';
	user: boolean = true;
	members: string[] | undefined;
	description: string | undefined;
	userStatus = 'Online';
	newMessage = '';
	isInputStarted = false;
	isRecording = false;
	audioUrl: string | null = null;
	messages: Message[] = [];
	chat: string;

	private mediaRecorder: MediaRecorder | null = null;
	private audioChunks: Blob[] = [];

	@ViewChild('chatContainer') private chatContainer: ElementRef | undefined;

	ngAfterViewInit() {
		this.scrollToBottom();
	}

	constructor(
		private _location: Location,
		private router: Router,
		private socketService: SocketService
	) {
		this.yourUsername = localStorage.getItem('username') || '';
		const queryParams = this.router.getCurrentNavigation()?.extractedUrl.queryParams as Params;
		const { id, url } = queryParams;
		this.chat = id;
		this.icon = url;
		fetch(`https://synclineserver.onrender.com/chats/messages?chat=${id}`, {
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
				if (data.result[0].user) {
					this.user = true;
					const user = data.result[0].members.find(
						(member: { username: string }) =>
							member.username !== localStorage.getItem('username')
					);
					this.username = user.username;
					// subscribe to online users
					this.socketService.onlineUsers$.subscribe((users: string[]) => {
						if (users.includes(this.username)) {
							this.userStatus = 'Online';
						} else {
							this.userStatus = 'Offline';
						}
					});
					this.messages = data.result[0].messages.map(
						(
							message: Array<{
								message: string;
								sender: string;
								timestamp: string;
								type: string;
								_id: string;
							}>
						) => {
							return {
								text: message[0].message,
								time: new Date(message[0].timestamp).toLocaleTimeString(undefined, {
									hour: 'numeric',
									minute: 'numeric',
									hour12: true
								}),
								isSent: message[0].sender === localStorage.getItem('username'),
								date: new Date(message[0].timestamp).toLocaleDateString('en-US', {
									weekday: 'long',
									day: 'numeric'
								}),
								isAudio: message[0].type === 'audio',
								timestamp: message[0].timestamp // Add timestamp to Message object
							};
						}
					);
					this.scrollToBottom();
				} else {
					// Group chat case
					this.user = false;
					this.username = data.result[0].name;
					this.description = data.result[0].description;
					this.userStatus = data.result[0].members.length + ' members';
					this.members = data.result[0].members;
					if (data.result[0].messages[0].length > 0)
						this.messages = data.result[0].messages.map(
							(
								message: Array<{
									message: string;
									sender: string;
									timestamp: string;
									type: string;
									_id: string;
								}>
							) => {
								return {
									text: message[0].message,
									time: new Date(message[0].timestamp).toLocaleTimeString(
										undefined,
										{
											hour: 'numeric',
											minute: 'numeric',
											hour12: true
										}
									),
									isSent: message[0].sender === localStorage.getItem('username'),
									username: message[0].sender,
									date: new Date(message[0].timestamp).toLocaleDateString(
										'en-US',
										{
											weekday: 'long',
											day: 'numeric'
										}
									),
									isAudio: message[0].type === 'audio',
									timestamp: message[0].timestamp // Add timestamp to Message object
								};
							}
						);
					this.scrollToBottom();
				}
			});
	}

	ngOnInit() {
		this.socketService.chatMessage$.subscribe(
			(message: {
				chat: string;
				message: string;
				messageType: string;
				sender: string;
				timestamp: string;
			}) => {
				console.log(message);
				if (message.chat === this.chat) {
					this.messages.push({
						text: message.message,
						time: new Date().toLocaleTimeString(undefined, {
							hour: 'numeric',
							minute: 'numeric',
							hour12: true
						}),
						isSent: false,
						date: new Date().toLocaleDateString('en-US', {
							weekday: 'long',
							day: 'numeric'
						}),
						isAudio: message.messageType === 'audio',
						user: this.user,
						username: message.sender,
						timestamp: message.timestamp // Add timestamp to Message object
					});
					this.scrollToBottom();
				}
			}
		);
	}

	get groupedMessages() {
		const groups = this.messages.reduce((groups: { [key: string]: Message[] }, message) => {
			const date = message.date;
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(message);
			return groups;
		}, {});

		// Sort messages within each group by timestamp
		for (const date in groups) {
			groups[date].sort(
				(a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
			);
		}
		return groups;
	}

	handleTextEntered(text: string) {
		this.newMessage = text;
		if (this.newMessage === '') {
			this.isInputStarted = false;
		}
	}

	onInputStarted() {
		this.isInputStarted = true;
	}

	sendMessage() {
		if (this.newMessage.trim() || this.audioUrl) {
			const message: Message = {
				text: this.audioUrl ? this.audioUrl : this.newMessage,
				time: new Date().toLocaleTimeString(undefined, {
					hour: 'numeric',
					minute: 'numeric',
					hour12: true
				}),
				isSent: true,
				date: new Date().toLocaleDateString('en-US', {
					weekday: 'long',
					day: 'numeric'
				}),
				isAudio: !!this.audioUrl,
				user: this.user,
				timestamp: new Date().toISOString() // Add timestamp to new message
			};

			this.messages.push(message);
			console.log(message);
			this.newMessage = '';
			this.isInputStarted = false;
			this.audioUrl = null;

			// Send the message to the server
			this.socketService.sendChatMessage({
				chat: this.chat,
				message: message.text,
				type: message.isAudio ? 'audio' : 'text'
			});
		}
		this.scrollToBottom();
	}

	startRecording() {
		this.isRecording = true;
		this.audioChunks = [];
		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
			this.mediaRecorder = new MediaRecorder(stream);
			this.mediaRecorder.ondataavailable = (event) => {
				this.audioChunks.push(event.data);
			};
			this.mediaRecorder.onstop = async () => {
				const audioBlob = new Blob(this.audioChunks, { type: 'audio/mp4' });
				const formData = new FormData();
				formData.append('audio', audioBlob);
				await fetch('https://synclineserver.onrender.com/upload', {
					method: 'POST',
					headers: {
						Authorization: localStorage.getItem('token') || ''
					},
					body: formData
				})
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						this.audioUrl = data.url;
						this.sendMessage();
					});
			};
			this.mediaRecorder.start();
		});
	}

	stopRecording() {
		if (this.isRecording && this.mediaRecorder) {
			this.mediaRecorder.stop();
			this.isRecording = false;
		}
	}

	scrollToBottom() {
		setTimeout(() => {
			if (this.chatContainer) {
				this.chatContainer.nativeElement.scrollTop =
					this.chatContainer.nativeElement.scrollHeight;
			}
		}, 100);
	}

	navigateToMainTab() {
		this._location.back();
	}

	showDetail() {
		this.router.navigate(['/groupchat-detail'], {
			state: {
				groupId: this.chat,
				url: this.icon,
				name: this.username,
				description: this.description,
				members: this.members
			}
		});
	}
}
