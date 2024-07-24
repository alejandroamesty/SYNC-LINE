import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  standalone: true,
})
export class ChatInputComponent {
  @Input() placeholder: string = '';
  @Output() inputValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() inputStarted: EventEmitter<void> = new EventEmitter<void>();

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.inputValue.emit(inputElement.value);
    if (inputElement.value.length > 0) {
      this.inputStarted.emit();
    }
  }
}
