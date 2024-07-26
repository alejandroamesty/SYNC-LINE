import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-action-input',
  templateUrl: './action-input.component.html',
  styleUrls: ['./action-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule]
})
export class ActionInputComponent implements OnInit {
  @Input() placeholder?: string;
  @Input() value?: string;
  @Input() style?: any;
  @Input() width = 350;
  @Input() height = 55;
  @Input() fontSize = 15;
  @Input() backgroundColor = '#1E264D';
  @Input() type?: string;
  @Input() isPassword = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<string>();

  error: string | null = null;
  isPasswordVisible = !this.isPassword;
  isEditable = false;

  inputControl: FormControl;

  constructor() {
    this.inputControl = new FormControl(this.value || '');
  }

  ngOnInit() {
    this.inputControl.valueChanges.subscribe((value) => this.handleOnChangeText(value));
    this.inputControl.disable(); // Ensure input is disabled on initialization
  }

  validateEmail(text: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  }

  validatePassword(text: string): string | null {
    const minLength = 8;
    const maxLength = 20;

    if (text.length < minLength) {
      return `Must be at least ${minLength} characters`;
    }
    if (text.length > maxLength) {
      return `Must be no more than ${maxLength} characters`;
    }
    return null;
  }

  handleOnChangeText(text: string): void {
    this.valueChange.emit(text);
    if (this.type === 'email' && !this.validateEmail(text)) {
      this.error = 'Invalid email format';
    } else if (this.type === 'password') {
      const passwordError = this.validatePassword(text);
      this.error = passwordError;
    } else {
      this.error = null;
    }
  }

  toggleEdit(editable: boolean): void {
    this.isEditable = editable;
    if (editable) {
      this.inputControl.enable(); // Enable input when editing
      this.onEdit.emit();
    } else {
      this.inputControl.disable(); // Disable input when not editing
    }
  }

  save(): void {
    this.toggleEdit(false);
    this.onSave.emit(this.inputControl.value);
  }
}
