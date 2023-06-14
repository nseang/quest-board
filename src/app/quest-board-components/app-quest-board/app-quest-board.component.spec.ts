import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppQuestBoardComponent } from './app-quest-board.component';

describe('AppQuestBoardComponent', () => {
  let component: AppQuestBoardComponent;
  let fixture: ComponentFixture<AppQuestBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppQuestBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppQuestBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
