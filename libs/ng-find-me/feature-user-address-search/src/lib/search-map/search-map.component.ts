import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMapLoaderService } from '../services/google-map-loader.service';
import { mapOptions } from './map-config';
import { UsersEntity } from '@findme/ng-find-me/users/data-access/users-state';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'findme-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMapComponent {
  @Input() set user(user: UsersEntity) {
    const address = user ? user.address : null;
    if (address) {
      const { lat, lng } = address;
      this.position = { lat, lng };
      this._map.panTo(this.position);
    }
  }

  _map: any;
  @ViewChild(GoogleMap, { static: false }) set appMap(m: GoogleMap) {
    if (m) {
      this._map = m;
    }
  }

  position: google.maps.LatLngLiteral = null;
  options = mapOptions;

  constructor(public mapLoader: GoogleMapLoaderService) {}
}
