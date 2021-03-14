import { TestBed, async } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { UsersEffects } from './users.effects';
import * as UsersActions from './users.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiUsersService } from '@findme/ng-find-me/users/data-access/users-api';

const apiService = {
  usersGet$Json: jest.fn(),
};

describe('UsersEffects', () => {
  let actions: Observable<any>;
  let effects: UsersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        HttpClientTestingModule,
        UsersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: ApiUsersService, useValue: apiService },
      ],
    });

    effects = TestBed.inject(UsersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UsersActions.init() });
      apiService.usersGet$Json.mockReturnValue(of([]));
      const expected = hot('-a-|', {
        a: UsersActions.loadUsersSuccess({ users: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
