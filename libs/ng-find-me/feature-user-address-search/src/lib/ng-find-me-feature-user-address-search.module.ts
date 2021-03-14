import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddressSearchComponent } from './user-address-search/user-address-search.component';
import { RouterModule, Routes } from '@angular/router';
import { TuiAvatarModule, TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiDataListModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiLetModule } from '@taiga-ui/cdk';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { GoogleMapLoaderService } from './services/google-map-loader.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { SearchAddressDetailComponent } from './search-address-detail/search-address-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserAddressSearchComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TuiLetModule,
    TuiAvatarModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    GoogleMapsModule,
    TuiSvgModule,
  ],
  declarations: [
    UserAddressSearchComponent,
    SearchInputComponent,
    SearchMapComponent,
    SearchAddressDetailComponent,
  ],
  providers: [GoogleMapLoaderService],
})
export class NgFindMeFeatureUserAddressSearchModule {}
