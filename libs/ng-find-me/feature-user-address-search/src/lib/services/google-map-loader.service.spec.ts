import { TestBed } from '@angular/core/testing';

import { GoogleMapLoaderService } from './google-map-loader.service';
import { HttpClient } from '@angular/common/http';
import { cold } from 'jasmine-marbles';

describe('GoogleMapLoaderService', () => {
  let service: GoogleMapLoaderService;
  const client = {
    jsonp: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: client },
        GoogleMapLoaderService,
      ],
    });
    client.jsonp.mockClear();
  });

  it('should be created', () => {
    client.jsonp.mockReturnValueOnce(cold('a|'));
    service = TestBed.inject(GoogleMapLoaderService);
    expect(service).toBeTruthy();
  });
});
