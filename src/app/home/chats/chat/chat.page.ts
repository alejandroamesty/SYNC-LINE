import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChatInputComponent } from 'src/components/chat/chat-input/chat-input.component';
import { SendButtonComponent } from 'src/components/chat/send-button/send-button.component';
import { ChatMessageComponent } from 'src/components/chat/chat-message/chat-message.component';
import { CommonModule } from '@angular/common';
import { ControlButtonComponent } from 'src/components/buttons/control-button/control-button.component';
import { Location } from '@angular/common';
import { RecordButtonComponent } from 'src/components/chat/record-button/record-button.component';

interface Message {
	text: string; // URL to audio file or text message
	time: string;
	isSent: boolean;
	date: string;
	isAudio: boolean; // New field to distinguish audio messages
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
	userName = 'John Doe';
	userStatus = 'Online';
	newMessage = '';
	isInputStarted = false;
	isRecording = false;
	audioFile: Blob | null = null;
	audioUrl: string | null = null;
	messages: Message[] = [
		{ text: 'Hello!', time: '10:00 AM', isSent: true, date: 'Tuesday, 15', isAudio: false },
		{ text: 'Hi there!', time: '10:01 AM', isSent: false, date: 'Tuesday, 15', isAudio: false },
		{
			text: 'How are you?',
			time: '10:02 AM',
			isSent: true,
			date: 'Wednesday, 16',
			isAudio: false
		},
		{
			text: 'I am good, thank you!',
			time: '10:03 AM',
			isSent: false,
			date: 'Wednesday, 16',
			isAudio: false
		},
		{
			text: 'What about you?',
			time: '10:04 AM',
			isSent: true,
			date: 'Wednesday, 16',
			isAudio: false
		},
		{
			text: 'I am doing great!',
			time: '10:05 AM',
			isSent: false,
			date: 'Wednesday, 16',
			isAudio: false
		},
		{
			text: 'How can I help you?',
			time: '10:06 AM',
			isSent: true,
			date: 'Wednesday, 16',
			isAudio: false
		},
		{
			text: 'I need help with my homework.',
			time: '10:07 AM',
			isSent: false,
			date: 'Wednesday, 16',
			isAudio: false
		}
	];

	private mediaRecorder: MediaRecorder | null = null;
	private audioChunks: Blob[] = [];

	constructor(private _location: Location) {}

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
				isAudio: !!this.audioFile
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
