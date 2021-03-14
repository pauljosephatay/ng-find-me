import React from 'react';

import styles from './user-search-detail.module.scss';
import { Address, UserSummary } from '../models';

/* eslint-disable-next-line */
export interface UserSearchDetailProps {
  user: UserSummary;
}

export function UserSearchDetail({ user }: UserSearchDetailProps) {
  const username = user?.name;
  const address = user?.address || ({} as Address);
  const { withPets, petPhoto: photoUrl, name: addressName } = address;

  return (
    <div className="detail">
      <h2 className={styles.userName}>{username}</h2>
      <div className={styles.address}>
        <div className="name">{addressName}</div>
        <div className="with-pet">With pets: {withPets ? 'Yes' : 'No'}</div>
        <div className="pet-photo">
          <img src={photoUrl} />
        </div>
      </div>
    </div>
  );
}

export default UserSearchDetail;
