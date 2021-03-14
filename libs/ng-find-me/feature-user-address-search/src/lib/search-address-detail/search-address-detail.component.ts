import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApiAddressVm } from '@findme/ng-find-me/users/data-access/users-api';

@Component({
  selector: 'findme-search-address-detail',
  templateUrl: './search-address-detail.component.html',
  styleUrls: ['./search-address-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchAddressDetailComponent {
  @Input() username: string;

  @Input() address: ApiAddressVm;

  get addressName() {
    return this.address?.name;
  }

  get withPet() {
    return this.address?.withPets;
  }

  get photoUrl() {
    return this.address?.petPhoto;
  }
}
