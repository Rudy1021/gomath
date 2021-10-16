import { TestBed } from '@angular/core/testing';

import { HttpsService } from './https.service';

describe('HttpsService', () => {
  let service: HttpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
