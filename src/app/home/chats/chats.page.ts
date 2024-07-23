import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { SpecialInputComponent } from 'src/components/inputs/special-input/special-input.component';
import { ChatItemComponent } from 'src/components/lists/chat-list/chat-item/chat-item.component';
import { ChatListComponent } from 'src/components/lists/chat-list/chat-list.component';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  standalone: true,
  imports: [
    IonSearchbar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    SpecialInputComponent,
    ChatItemComponent,
    ChatListComponent,
  ],
})
export class ChatsPage implements OnInit {

  chats = [
    {
      id: '1',
      name: 'Ingeniería Computación',
      preview: 'Saludos apreciados miembros de la comunidad estudiantil...',
      time: '5:01 PM',
      icon: 'assets/images/IMG_2751.png',
    },
    {
      id: '2',
      name: 'Actualización del Proyecto',
      preview: 'Por favor, revisen los últimos cambios...',
      time: '4:45 PM',
      icon: 'assets/images/IMG_2751.png',
    },
    {
      id: '3',
      name: 'Notificación',
      preview: 'La reunión se ha movido a las 3:00 PM...',
      time: '3:00 PM',
      icon: 'assets/images/IMG_2751.png',
    },
    {
      id: '4',
      name: 'Revisión',
      preview: 'Aquí está el documento revisado...',
      time: '11:30 AM',
      icon: 'assets/images/IMG_2751.png',
    },
    {
      id: '5',
      name: 'Revisión',
      preview: 'Aquí está el documento revisado...',
      time: '11:30 AM',
      icon: 'assets/images/IMG_2751.png',
    },
    {
      id: '6',
      name: 'Revisión',
      preview: 'Aquí está el documento revisado...',
      time: '11:30 AM',
      icon: 'assets/images/IMG_2751.png',
    },
    {
      id: '7',
      name: 'Revisión',
      preview: 'Aquí está el documento revisado...',
      time: '11:30 AM',
      icon: 'assets/images/IMG_2751.png',
    },
  ];

  constructor() {}

  ngOnInit() {
    console.log('Chats:', this.chats);
  }

  handleInputValue(value: string): void {
    console.log('Input value:', value);
  }
}
