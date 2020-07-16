import { TestBed } from '@angular/core/testing';

import { WidgitsService } from './widgits.service';

describe('WidgitsService', () => {
  let service: WidgitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
