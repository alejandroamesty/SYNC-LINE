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
  text: string;
  time: string;
  isSent: boolean;
  date: string;
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
    RecordButtonComponent,
  ],
})
export class ChatPage {
  icon = 'assets/images/IMG_2751.png';
  userName = 'John Doe';
  userStatus = 'Online';
  newMessage = '';
  isInputStarted = false;
  messages: Message[] = [
    { text: 'Hello!', time: '10:00 AM', isSent: true, date: 'Tuesday, 15' },
    { text: 'Hi there!', time: '10:01 AM', isSent: false, date: 'Tuesday, 15' },
    {
      text: 'How are you?',
      time: '10:02 AM',
      isSent: true,
      date: 'Wednesday, 16',
    },
    {
      text: 'I am good, thank you!',
      time: '10:03 AM',
      isSent: false,
      date: 'Wednesday, 16',
    },
    {
      text: 'What about you?',
      time: '10:04 AM',
      isSent: true,
      date: 'Wednesday, 16',
    },
    {
      text: 'I am doing great!',
      time: '10:05 AM',
      isSent: false,
      date: 'Wednesday, 16',
    },
    {
      text: 'How can I help you?',
      time: '10:06 AM',
      isSent: true,
      date: 'Wednesday, 16',
    },
    {
      text: 'I need help with my homework.',
      time: '10:07 AM',
      isSent: false,
      date: 'Wednesday, 16',
    },
  ];

  constructor(private _location: Location) {}

  get groupedMessages() {
    return this.messages.reduce(
      (groups: { [key: string]: Message[] }, message) => {
        const date = message.date;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(message);
        return groups;
      },
      {}
    );
  }

  handleTextEntered(text: string) {
    this.newMessage = text;
  }

  onInputStarted() {
    this.isInputStarted = true;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        time: new Date().toLocaleTimeString(),
        isSent: true,
        date: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
        }),
      });
      this.newMessage = '';
      this.isInputStarted = false;
    }
  }

  startRecording() {
    // Implement your start recording logic here
  }

  stopRecording() {
    // Implement your stop recording logic here
  }

  navigateToMainTab() {
    this._location.back();
  }
}
