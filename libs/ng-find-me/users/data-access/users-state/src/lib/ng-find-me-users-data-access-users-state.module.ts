import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './+state/users.reducer';
import { UsersEffects } from './+state/users.effects';
import { UsersApiModule } from '@findme/ng-find-me/users/data-access/users-api';
import { environment } from '@findme/ng-find-me/shared/environments';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
    UsersApiModule.forRoot({ rootUrl: environment.apiRootUrl }),
  ],
})
export class NgFindMeUsersDataAccessUsersStateModule {}
