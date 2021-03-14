import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const parseUrl = (googleKey: string, mapUrl: string) =>
  mapUrl.replace('[GOOGLE_KEY]', googleKey);

@Injectable()
export class GoogleMapLoaderService {
  mapUrl = `https://maps.googleapis.com/maps/api/js?key=[GOOGLE_KEY]`;
  private loadedSubject$ = new BehaviorSubject(false);
  readonly loaded$ = this.loadedSubject$.asObservable();

  constructor(private httpClient: HttpClient) {
    this.initGoogleMap();
  }

  private initGoogleMap() {
    // api key needs to be carefully kept. restricted to allowed ips
    const key = 'AIzaSyChM6JLjJQRH6PgwRhU1_njFhMK3EPfoDM';
    const mapUrl = parseUrl(key, this.mapUrl);
    this.httpClient
      .jsonp(mapUrl, 'callback')
      .pipe(
        map(() => true),
        catchError(() => {
          return of(false);
        }),
        tap((loaded: boolean) => this.loadedSubject$.next(loaded))
      )
      .subscribe();
  }
}
