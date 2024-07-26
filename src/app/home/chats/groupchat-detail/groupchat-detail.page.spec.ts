import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupchatDetailPage } from './groupchat-detail.page';

describe('GroupchatDetailPage', () => {
  let component: GroupchatDetailPage;
  let fixture: ComponentFixture<GroupchatDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupchatDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
