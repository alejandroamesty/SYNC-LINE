import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';

import { ChatsPage } from '../chats/chats.page';
import { UpdatesPage } from '../updates/updates.page';
import { ContactsPage } from '../contacts/contacts.page';
import { ProfilePage } from '../profile/profile.page';

import { NavBarComponent } from 'src/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-main-tab',
  standalone: true,
  templateUrl: './main-tab.page.html',
  styleUrls: ['./main-tab.page.scss'],
  imports: [
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    IonIcon,
    ChatsPage,
    UpdatesPage,
    ContactsPage,
    ProfilePage,
    NavBarComponent,
  ],
})
export class MainTabPage implements OnInit, AfterViewInit, OnDestroy {
  activeIndex: number = 0;
  private mainContentElement: HTMLElement | null = null;
  private navBarElement: HTMLElement | null = null;
  private lastScrollTop = 0;

  ngOnInit() {}

  ngAfterViewInit() {
    this.mainContentElement = document.getElementById('main-content');
    this.navBarElement = document.querySelector('.nav-bar');

    if (this.mainContentElement) {
      this.mainContentElement.addEventListener('scroll', this.onContentScroll);
    }
  }

  ngOnDestroy() {
    if (this.mainContentElement) {
      this.mainContentElement.removeEventListener(
        'scroll',
        this.onContentScroll
      );
    }
  }

  onTabChanged(index: number) {
    this.activeIndex = index;
  }

  onContentScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      this.navBarElement?.classList.add('hide');
    } else {
      this.navBarElement?.classList.remove('hide');
    }

    this.lastScrollTop = scrollTop;
  };
}
