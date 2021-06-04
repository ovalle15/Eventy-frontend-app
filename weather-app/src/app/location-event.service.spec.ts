import { TestBed } from '@angular/core/testing';

import { LocationEventService } from './location-event.service';

describe('LocationEventService', () => {
  let service: LocationEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
