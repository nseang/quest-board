import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestDetailsModalComponent } from './quest-details-modal.component';

describe('QuestDetailsModalComponent', () => {
  let component: QuestDetailsModalComponent;
  let fixture: ComponentFixture<QuestDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
