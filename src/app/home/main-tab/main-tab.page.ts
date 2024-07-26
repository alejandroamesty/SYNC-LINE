import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

import { ChatsPage } from '../chats/chats.page';
import { UpdatesPage } from '../updates/updates.page';
import { ContactsPage } from '../contacts/contacts.page';
import { ProfilePage } from '../profile/profile.page';

import { NavBarComponent } from 'src/components/items/nav-bar/nav-bar.component';
import { SocketService } from 'src/app/services/socket-service.service';

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
		NavBarComponent
	]
})
export class MainTabPage implements OnInit, AfterViewInit, OnDestroy {
	activeIndex: number = 0;
	private navBarElement: HTMLElement | null = null;

	constructor(private socketService: SocketService) {
		this.socketService.connect();
	}

	ngOnInit() {}

	ngOnDestroy(): void {}

	ngAfterViewInit() {
		this.navBarElement = document.querySelector('.nav-bar');
	}

	onTabChanged(index: number) {
		this.activeIndex = index;
	}

	handleScrollUp() {
		this.navBarElement?.classList.remove('hide');
	}

	handleScrollDown() {
		this.navBarElement?.classList.add('hide');
	}
}
