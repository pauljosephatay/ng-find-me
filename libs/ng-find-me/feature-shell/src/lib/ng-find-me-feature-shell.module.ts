import { NgModule } from '@angular/core';
import { NgFindMeSharedDataAccessModule } from '@findme/ng-find-me/shared/data-access';
import { NgFindMeUsersDataAccessUsersStateModule } from '@findme/ng-find-me/users/data-access/users-state';
import { ShellComponent } from './shell/shell.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user-address-search',
      },
      {
        path: 'user-address-search',
        loadChildren: () =>
          import('@findme/ng-find-me/feature-user-address-search').then(
            (esModule) => esModule.NgFindMeFeatureUserAddressSearchModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgFindMeSharedDataAccessModule,
    NgFindMeUsersDataAccessUsersStateModule,
  ],
  declarations: [ShellComponent],
  exports: [RouterModule],
})
export class NgFindMeFeatureShellModule {}
