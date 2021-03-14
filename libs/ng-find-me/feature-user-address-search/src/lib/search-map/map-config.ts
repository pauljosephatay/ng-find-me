const mapStyles = [
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#bfbfbf',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [
      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export const mapOptions = {
  disableDefaultUI: true,
  center: { lat: -43.52942699743086, lng: 172.63082446431713 },
  mapTypeId: 'roadmap' as google.maps.MapTypeId,
  mapTypeControl: true,
  mapTypeControlOptions: { style: 2 },
  zoom: 13,
  minZoom: 2.5,
  maxZoom: 18,
  zoomControl: true,
  zoomControlOptions: {
    position: 9 as google.maps.ControlPosition.BOTTOM_RIGHT,
  },
  styles: mapStyles,
};
