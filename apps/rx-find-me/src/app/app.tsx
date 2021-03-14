import React, { useState } from 'react';
import UserSearchInput from './user-search-input/user-search-input';
import UserSearchMap from './user-search-map/user-search-map';
import { UserSummary } from './models';
import UserSearchDetail from './user-search-detail/user-search-detail';
import styles from './app.module.scss';

export function App() {
  const [user, setUser] = useState<UserSummary>(null);
  const notNullUser = !!user;
  return (
    <div className={styles.app}>
      <UserSearchInput onValueChange={(value) => setUser(value)} />
      <UserSearchMap user={user}></UserSearchMap>
      {notNullUser ? (
        <div className={styles.userDetail}>
          <UserSearchDetail user={user} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
