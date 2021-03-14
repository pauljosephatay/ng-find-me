import { Component, OnInit } from '@angular/core';
import { UsersEntity } from '@findme/ng-find-me/users/data-access/users-state';

@Component({
  selector: 'findme-user-address-search',
  templateUrl: './user-address-search.component.html',
  styleUrls: ['./user-address-search.component.scss'],
})
export class UserAddressSearchComponent {
  searching = false;
  user: UsersEntity;

  onSelected(user: UsersEntity) {
    this.searching = false;
    this.user = user;
  }

  onFocus(focused: boolean) {
    this.searching = focused;
  }
}
