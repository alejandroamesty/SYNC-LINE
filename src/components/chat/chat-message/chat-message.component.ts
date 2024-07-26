import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
	selector: 'app-chat-message',
	standalone: true,
	templateUrl: './chat-message.component.html',
	styleUrls: ['./chat-message.component.scss'],
	imports: [CommonModule]
})
export class ChatMessageComponent implements OnInit, OnDestroy {
	@Input() user!: boolean;
	@Input() username: string | undefined;
	@Input() text: string | undefined; // URL to audio file
	@Input() time: string | undefined;
	@Input() isSent: boolean | undefined;
	@Input() isAudio: boolean = false; // New input to handle audio messages

	audioElement: HTMLAudioElement | undefined;
	isPlaying: boolean = false;
	progress: number = 0;
	duration: number = 0;
	currentTime: number = 0;
	intervalSubscription: Subscription | undefined;

	ngOnInit() {
		if (this.isAudio && this.text) {
			this.audioElement = new Audio(this.text);

			this.audioElement.addEventListener('loadedmetadata', () => {
				if (
					this.audioElement &&
					(this.audioElement.duration === Infinity || isNaN(this.audioElement.duration))
				) {
					this.audioElement.currentTime = 1e101; // Fake big time
					this.audioElement.addEventListener('timeupdate', this.getDuration);
				} else {
					if (this.audioElement) {
					  this.duration = this.audioElement.duration;
					}
					console.log('Duración inicial:', this.duration);
				}
			});

			this.audioElement.addEventListener('timeupdate', () => {
				if (this.audioElement) {
					this.currentTime = this.audioElement.currentTime;
					if (this.duration > 0) {
						this.progress = (this.currentTime / this.duration) * 100;
					}
					this.updateTimeDisplay();
				}
			});

			this.audioElement.addEventListener('ended', () => {
				this.isPlaying = false;
			});

			this.audioElement.addEventListener('error', (event) => {
				console.error('Error al cargar el archivo de audio:', event);
			});
		}
	}

	getDuration = (event: Event) => {
		const target = event.target as HTMLAudioElement;
		if (target) {
			target.currentTime = 0;
			target.removeEventListener('timeupdate', this.getDuration);
			this.duration = target.duration;
			console.log('Duración actualizada:', this.duration);
		}
	};

	updateTimeDisplay(): void {
		if (this.audioElement) {
			this.currentTime = this.audioElement.currentTime;
		}
	}

	formatTime(seconds: number): string {
		if (isNaN(seconds) || seconds < 0) {
			return '00:00';
		}
		const minutes = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${this.pad(minutes)}:${this.pad(secs)}`;
	}

	pad(number: number): string {
		return number < 10 ? `0${number}` : `${number}`;
	}

	togglePlay() {
		if (this.audioElement) {
			if (this.isPlaying) {
				this.audioElement.pause();
			} else {
				this.audioElement.play();
			}
			this.isPlaying = !this.isPlaying;
		}
	}

	ngOnDestroy() {
		if (this.audioElement) {
			this.audioElement.pause();
			this.audioElement.src = '';
		}
		if (this.intervalSubscription) {
			this.intervalSubscription.unsubscribe();
		}
	}
}
