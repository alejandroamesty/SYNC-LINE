import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-border-input',
  templateUrl: './border-input.component.html',
  styleUrls: ['./border-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
})
export class BorderInputComponent implements OnInit {
  @Input() placeholder?: string;
  @Input() value?: string;
  @Input() style?: any;
  @Input() image?: string;
  @Input() width = 350;
  @Input() height = 55;
  @Input() fontSize = 15;
  @Input() backgroundColor = '#1E264D';
  @Input() type?: string;
  @Input() isPassword = false;

  @Output() valueChange = new EventEmitter<string>();

  error: string | null = null;
  isPasswordVisible = !this.isPassword;

  inputControl: FormControl;

  constructor() {
    this.inputControl = new FormControl(this.value || '');
  }

  ngOnInit() {
    this.inputControl.valueChanges.subscribe((value) =>
      this.handleOnChangeText(value)
    );
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

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
