import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
  standalone: true,
})
export class ChatItemComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() preview!: string;
  @Input() time!: string;
  @Input() icon!: string;
}
