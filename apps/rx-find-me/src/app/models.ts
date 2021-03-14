export interface Address {
  lat: number;
  lng: number;
  name: string;
  withPets: boolean;
  petPhoto: string;
}

export interface UserSummary {
  name: string;
  address: Address;
}
