import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	private socket: any;
	private token = localStorage.getItem('token');
	private onlineUsers: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	private chatMessageSubject = new Subject<any>();

	chatMessage$ = this.chatMessageSubject.asObservable();
	onlineUsers$ = this.onlineUsers.asObservable();

	constructor() {
		this.socket = io('http://localhost:8000', {
			autoConnect: false,
			auth: {
				token: this.token
			}
		});
		this.initializeSocket();
	}

	connect() {
		this.socket.connect();
	}

	sendChatMessage(message: { message: string; chat: string; type: string }) {
		this.socket.emit('chat-message', message);
	}

	sendGroupMessage(message: { message: string; chat: string; type: string }) {
		this.socket.emit('group-message', message);
	}

	private initializeSocket() {
		this.socket.on('connect', () => {
			console.log('Connected to server');
		});

		this.socket.on('error', (error: any) => {
			console.error('Error:', error);
		});

		this.socket.on('disconnect', () => {
			console.log('Disconnected from server');
		});

		this.socket.on('user-connected', (username: string) => {
			const updatedUsers = [...this.onlineUsers.getValue(), username];
			this.onlineUsers.next(updatedUsers);
			console.log('User connected:', username);
		});

		this.socket.on('user-disconnected', (username: string) => {
			const updatedUsers = this.onlineUsers.getValue().filter((user) => user !== username);
			this.onlineUsers.next(updatedUsers);
			console.log('User disconnected:', username);
		});

		this.socket.on('chat-message', (message: any) => {
			this.chatMessageSubject.next(message);
		});

		this.socket.on('group-message', (message: any) => {
			this.chatMessageSubject.next(message);
		});
	}
}
