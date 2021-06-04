import { TestBed } from '@angular/core/testing';

import { WeatherStackService } from './weatherstack.service';

describe('WeatherStackService', () => {
  let service: WeatherStackService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherStackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
