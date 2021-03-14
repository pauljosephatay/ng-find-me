/**
 * Interface for the 'Users' data
 */
import { ApiUserSummary } from '@findme/ng-find-me/users/data-access/users-api';

export interface UsersEntity extends ApiUserSummary {
  id?: string; // Primary ID
}
