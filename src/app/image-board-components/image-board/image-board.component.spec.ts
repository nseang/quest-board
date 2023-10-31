import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBoardComponent } from './image-board.component';

describe('ImageBoardComponent', () => {
  let component: ImageBoardComponent;
  let fixture: ComponentFixture<ImageBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
