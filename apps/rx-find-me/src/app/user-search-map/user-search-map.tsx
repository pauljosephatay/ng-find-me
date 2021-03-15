import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import './user-search-map.module.scss';
import { UserSummary } from '../models';
import { mapOptions } from './map-config';

/* eslint-disable-next-line */
export interface UserSearchMapProps {
  user: UserSummary;
}

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 84px)',
};

const center = {
  lat: -43.52942699743086,
  lng: 172.63082446431713,
};

const getMarkerPosition = (user: UserSummary) => {
  const address = user ? user.address : null;
  if (address) {
    const { lat, lng } = address;
    return { lat, lng };
  }
};

export function UserSearchMap({ user }: UserSearchMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyChM6JLjJQRH6PgwRhU1_njFhMK3EPfoDM',
  });

  const [map, setMap] = React.useState(null);
  const position = getMarkerPosition(user);
  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (map && position) {
    map.panTo(position);
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={mapOptions}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={position} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default UserSearchMap;
