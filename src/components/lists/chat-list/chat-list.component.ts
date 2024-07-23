import { Component, Input } from '@angular/core';
import { ChatItemComponent } from './chat-item/chat-item.component';

interface Chat {
  id: string;
  name: string;
  preview: string;
  time: string;
  icon: string;
}

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  standalone: true,
  imports: [ChatItemComponent],
})
export class ChatListComponent {
  @Input() chats: Chat[] = [];

  get sortedChats(): Chat[] {
    console.log('Unsorted chats:', this.chats);
    const sorted = this.chats.sort(
      (a, b) => this.convertTime(b.time) - this.convertTime(a.time)
    );
    console.log('Sorted chats:', sorted);
    return sorted;
  }

  private convertTime(time: string): number {
    const [timeStr, modifier] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  }
}
