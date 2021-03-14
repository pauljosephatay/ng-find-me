/* tslint:disable */
/* eslint-disable */
import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { ApiUsersService } from './services/api-users.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [ApiUsersService, ApiConfiguration],
})
export class UsersApiModule {
  static forRoot(
    params: ApiConfigurationParams
  ): ModuleWithProviders<UsersApiModule> {
    return {
      ngModule: UsersApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params,
        },
      ],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: UsersApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        'UsersApiModule is already loaded. Import in your base AppModule only.'
      );
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
          'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}
