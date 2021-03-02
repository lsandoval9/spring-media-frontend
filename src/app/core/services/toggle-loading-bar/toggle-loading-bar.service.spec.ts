import { TestBed } from '@angular/core/testing';

import { ToggleLoadingBarService } from './toggle-loading-bar.service';

describe('ToggleLoadingBarService', () => {
  let service: ToggleLoadingBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleLoadingBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
