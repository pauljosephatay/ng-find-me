import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as UsersActions from './users.actions';
import { map } from 'rxjs/operators';
import { ApiUsersService } from '@findme/ng-find-me/users/data-access/users-api';

@Injectable()
export class UsersEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.init),
      fetch({
        run: (action) => {
          return this.usersApi
            .usersGet$Json()
            .pipe(map((users) => UsersActions.loadUsersSuccess({ users })));
        },

        onError: (action, error) => {
          console.error('Error', error);
          return UsersActions.loadUsersFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions, private usersApi: ApiUsersService) {}
}
