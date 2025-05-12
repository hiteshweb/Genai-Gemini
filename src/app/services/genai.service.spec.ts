import { TestBed } from '@angular/core/testing';

import { GenaiService } from './genai.service';

describe('GenaiService', () => {
  let service: GenaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
