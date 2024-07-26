import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	private socket: any;
	private token = localStorage.getItem('token');
	private onlineUsers: string[] = [];
	private chatMessageSubject = new Subject<any>();

	chatMessage$ = this.chatMessageSubject.asObservable();

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
			this.onlineUsers.push(username);
			console.log('User connected:', username);
		});

		this.socket.on('user-disconnected', (username: string) => {
			this.onlineUsers = this.onlineUsers.filter((user) => user !== username);
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
