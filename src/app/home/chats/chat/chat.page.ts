import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChatInputComponent } from 'src/components/chat/chat-input/chat-input.component';
import { SendButtonComponent } from 'src/components/chat/send-button/send-button.component';
import { ChatMessageComponent } from 'src/components/chat/chat-message/chat-message.component';
import { CommonModule } from '@angular/common';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';
import { Location } from '@angular/common';
import { RecordButtonComponent } from 'src/components/chat/record-button/record-button.component';
import { Params, Router } from '@angular/router';

interface Message {
	text: string; // URL to audio file or text message
	time: string;
	isSent: boolean;
	date: string;
	isAudio: boolean; // New field to distinguish audio messages
	user: boolean;
	username?: string;
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
export class ChatPage {
	icon = 'assets/images/IMG_2751.png';
	yourUsername: string;
	username = 'John Doe';
	user: boolean = true;
	userStatus = 'Online';
	newMessage = '';
	isInputStarted = false;
	isRecording = false;
	audioFile: Blob | null = null;
	audioUrl: string | null = null;
	messages: Message[] = [];
	testMessages = [
		{
			text: 'Hello!',
			time: '10:00 AM',
			isSent: true,
			date: 'Tuesday, 15',
			isAudio: false,
			user: false
		},
		{
			text: 'Hi there!',
			time: '10:01 AM',
			isSent: false,
			date: 'Tuesday, 15',
			isAudio: false,
			user: false
		},
		{
			text: 'How are you?',
			time: '10:02 AM',
			isSent: true,
			date: 'Wednesday, 16',
			isAudio: false,
			user: false
		},
		{
			text: 'I am good, thank you!',
			time: '10:03 AM',
			isSent: false,
			date: 'Wednesday, 16',
			isAudio: false,
			user: false
		},
		{
			text: 'What about you?',
			time: '10:04 AM',
			isSent: true,
			date: 'Wednesday, 16',
			isAudio: false,
			user: false
		},
		{
			text: 'I am doing great!',
			time: '10:05 AM',
			isSent: false,
			date: 'Wednesday, 16',
			isAudio: false,
			user: false
		},
		{
			text: 'How can I help you?',
			time: '10:06 AM',
			isSent: true,
			date: 'Wednesday, 16',
			isAudio: false,
			user: false
		},
		{
			text: 'I need help with my homework.',
			time: '10:07 AM',
			isSent: false,
			date: 'Wednesday, 16',
			isAudio: false,
			user: false
		}
	];

	private mediaRecorder: MediaRecorder | null = null;
	private audioChunks: Blob[] = [];

	constructor(
		private _location: Location,
		private router: Router
	) {
		this.yourUsername = localStorage.getItem('username') || '';
		const queryParams = this.router.getCurrentNavigation()?.extractedUrl.queryParams as Params;
		const { id, url } = queryParams;
		this.icon = url;
		fetch(`http://localhost:8000/chats/messages?chat=${id}`, {
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
								isAudio: message[0].type === 'audio'
							};
						}
					);
				} else {
					// Group chat case
					this.user = false;
					this.username = data.result[0].name;
					this.userStatus = data.result[0].members.length + ' members';
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
								username: message[0].sender,
								date: new Date(message[0].timestamp).toLocaleDateString('en-US', {
									weekday: 'long',
									day: 'numeric'
								}),
								isAudio: message[0].type === 'audio'
							};
						}
					);
				}
			});
	}

	get groupedMessages() {
		return this.messages.reduce((groups: { [key: string]: Message[] }, message) => {
			const date = message.date;
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(message);
			return groups;
		}, {});
	}

	handleTextEntered(text: string) {
		this.newMessage = text;
	}

	onInputStarted() {
		this.isInputStarted = true;
	}

	sendMessage() {
		if (this.newMessage.trim() || this.audioFile) {
			const message: Message = {
				text: this.audioUrl ? this.audioUrl : this.newMessage,
				time: new Date().toLocaleTimeString(),
				isSent: true,
				date: new Date().toLocaleDateString('en-US', {
					weekday: 'long',
					day: 'numeric'
				}),
				isAudio: !!this.audioFile,
				user: this.user
			};

			this.messages.push(message);
			this.newMessage = '';
			this.isInputStarted = false;
			this.audioFile = null;
			this.audioUrl = null;
		}
	}

	startRecording() {
		this.isRecording = true;
		this.audioChunks = [];
		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
			this.mediaRecorder = new MediaRecorder(stream);
			this.mediaRecorder.ondataavailable = (event) => {
				this.audioChunks.push(event.data);
			};
			this.mediaRecorder.onstop = () => {
				const audioBlob = new Blob(this.audioChunks, { type: 'audio/mp4' });
				this.audioFile = audioBlob;
				this.audioUrl = URL.createObjectURL(audioBlob);

				// Simulate file download for testing
				const downloadLink = document.createElement('a');
				downloadLink.href = this.audioUrl;
				downloadLink.download = `recording-${new Date().toISOString()}.mp4`;
				downloadLink.click();

				// Add the recorded audio as a message
				this.sendMessage();
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

	navigateToMainTab() {
		this._location.back();
	}
}
