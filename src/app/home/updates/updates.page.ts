import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { StatusItemComponent } from 'src/components/items/status-item/status-item.component';
import { SpecialInputComponent } from 'src/components/inputs/special-input/special-input.component';
import { MyStatusItemComponent } from 'src/components/items/my-status-item/my-status-item.component';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.page.html',
  styleUrls: ['./updates.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    StatusItemComponent,
    SpecialInputComponent,
    MyStatusItemComponent,
  ],
})
export class UpdatesPage implements OnInit {
  userStatus = {
    id: '10',
    nombre: 'Alejandro Ávila',
    time: 'Add to status',
    viewed: false,
  };
  recentStatus = [
    {
      id: '1',
      nombre: 'Prof. Genyelbert',
      time: '16m ago',
      viewed: false,
    },
    {
      id: '3',
      nombre: 'Dr. Martinez',
      time: '3h ago',
      viewed: false,
    },
    {
      id: '5',
      nombre: 'Prof. Fernandez',
      time: '1d ago',
      viewed: false,
    },
  ];

  viewedStatus = [
    {
      id: '2',
      nombre: 'Prof. Genyelbert',
      time: '16m ago',
      viewed: true,
    },
    {
      id: '4',
      nombre: 'Dr. Martinez',
      time: '3h ago',
      viewed: true,
    },
    {
      id: '6',
      nombre: 'Prof. Fernandez',
      time: '1d ago',
      viewed: true,
    },
  ];

  constructor() {}

  ngOnInit() {}

  handleStatusPress(id: string) {
    console.log('Status item pressed:', id);
  }

  handleInputValue(value: string): void {
    console.log('Input value:', value);
  }
}
