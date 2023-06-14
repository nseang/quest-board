import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestFormComponent } from './new-quest-form.component';

describe('NewQuestFormComponent', () => {
  let component: NewQuestFormComponent;
  let fixture: ComponentFixture<NewQuestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQuestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewQuestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
