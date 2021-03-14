import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  getAllUsers,
  init,
  UsersEntity,
  UsersPartialState,
} from '@findme/ng-find-me/users/data-access/users-state';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';
import { tuiIconSearchLarge } from '@taiga-ui/icons';

const matchQuery = (query: string, items: UsersEntity[]) =>
  items.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));

@Component({
  selector: 'findme-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  @Output() focused = new EventEmitter<boolean>();
  @Output() selected = new EventEmitter<UsersEntity>();

  readonly control = new FormControl();
  readonly filtered$: Observable<UsersEntity[]>;
  readonly searchIcon = tuiIconSearchLarge;

  private readonly items$: Observable<UsersEntity[]>;
  private readonly query$ = new BehaviorSubject('');

  constructor(private store: Store<UsersPartialState>) {
    this.items$ = this.store.pipe(select(getAllUsers));

    this.filtered$ = this.query$.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap((query) =>
        this.items$.pipe(
          map((items) => matchQuery(query, items)),
          take(1)
        )
      ),
      startWith([]),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
    this.initUsers();
  }

  private initUsers() {
    const action = init();
    this.store.dispatch(action);
  }

  onSearch(search: string) {
    this.query$.next(search);
  }

  onSelected(user: UsersEntity) {
    this.selected.emit(user);
  }

  onFocus(focused: boolean) {
    this.focused.emit(focused);
  }
}
