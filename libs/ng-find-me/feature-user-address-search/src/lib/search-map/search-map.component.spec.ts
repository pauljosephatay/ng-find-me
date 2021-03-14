import { SearchMapComponent } from './search-map.component';
import { of } from 'rxjs';
import { render, screen } from '@testing-library/angular';
import { Component, Input } from '@angular/core';
import { MockComponent } from '@findme/ng-find-me/utils-testing';
import { GoogleMapLoaderService } from '../services/google-map-loader.service';

const googleService = {
  loaded$: of(true),
};

class LatLngBounds {
  extend() {
    return this;
  }
}

const originalGoogle = global['google'];
global['google'] = {
  maps: {
    LatLngBounds: LatLngBounds,
  },
};

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'google-map',
  template: '<ng-content></ng-content>',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class MockGoogleMap {
  //mock google map class
  @Input() height: string;
  @Input() width: string;
  @Input() options: any;

  panTo = jest.fn();
}

const components = [
  MockComponent({
    selector: 'google-map',
    inputs: ['height', 'width', 'options'],
    template: '<ng-content></ng-content>',
  }),
  MockComponent({
    selector: 'map-marker',
    inputs: ['position'],
    template: 'Marker 1',
  }),
];

describe('SearchMapComponent', () => {
  afterAll(() => {
    global['google'] = originalGoogle;
  });

  test('should render component', async () => {
    const gMap = new MockGoogleMap();
    const component = await render(SearchMapComponent, {
      declarations: [...components],
      providers: [{ provide: GoogleMapLoaderService, useValue: googleService }],
      componentProperties: {
        _map: gMap,
        user: { address: { lat: 1, lng: 1 } },
      },
    });
    await screen.findByText('Marker 1');
    expect(gMap.panTo).toHaveBeenCalled();
  });
});
