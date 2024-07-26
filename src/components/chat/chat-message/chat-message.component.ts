import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-chat-message',
	standalone: true,
	templateUrl: './chat-message.component.html',
	styleUrls: ['./chat-message.component.scss'],
	imports: [CommonModule]
})
export class ChatMessageComponent {
	@Input() user!: boolean;
	@Input() username: string | undefined;
	@Input() text: string | undefined;
	@Input() time: string | undefined;
	@Input() isSent: boolean | undefined;
	@Input() isAudio: boolean = false;
}
