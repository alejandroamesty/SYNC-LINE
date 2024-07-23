import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ListComponent implements OnChanges {
  @Input() data: {
    id: string;
    name: string;
    description: string;
    userId: string;
    songIds: string[];
    checked: boolean;
  }[] = [];

  @Output() setExternalList = new EventEmitter<any[]>();

  items: {
    id: string;
    name: string;
    description: string;
    userId: string;
    songIds: string[];
    checked: boolean;
  }[] = [];
  containerHeight: number = 200;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.items = [...this.data];
    }
  }

  get alphabet() {
    return [...new Set(this.items.map((item) => item.name[0]))].sort();
  }

  filteredItemsByLetter(letter: string) {
    return this.items.filter((item) => item.name.startsWith(letter));
  }

  handleCheck(id: string) {
    this.items = this.items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    this.setExternalList.emit(this.items);
  }

  isLastItem(item: any, letter: string) {
    const filteredItems = this.filteredItemsByLetter(letter);
    return filteredItems.indexOf(item) === filteredItems.length - 1;
  }
}
