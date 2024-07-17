import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainTabPage } from './main-tab.page';

describe('MainTabPage', () => {
  let component: MainTabPage;
  let fixture: ComponentFixture<MainTabPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
