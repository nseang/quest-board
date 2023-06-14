import { TestBed } from '@angular/core/testing';

import { QuestReceptionistService } from './quest-receptionist.service';

describe('QuestReceptionistService', () => {
  let service: QuestReceptionistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestReceptionistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
