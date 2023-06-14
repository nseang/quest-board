import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppQuestListingComponent } from './app-quest-listing.component';

describe('AppQuestListingComponent', () => {
  let component: AppQuestListingComponent;
  let fixture: ComponentFixture<AppQuestListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppQuestListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppQuestListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
