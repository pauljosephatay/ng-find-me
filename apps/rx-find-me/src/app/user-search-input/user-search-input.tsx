import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';

import styles from './user-search-input.module.scss';
import { ReactComponent as SearchIcon } from '../../assets/search-24px.svg';
import { UserSummary } from '../models';

/* eslint-disable-next-line */
export interface UserSearchInputProps {
  value: string;
  suggestions: any[];
}

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (users, value) => {
  const inputValue = value.trim().toLowerCase();
  return users.filter((user) =>
    user.name.toLowerCase().includes(inputValue.toLowerCase())
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion) => suggestion.name;

const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

export const UserSearchInput = ({ onValueChange }) => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<UserSummary[]>([]);

  const apiUrl =
    'https://findmeapi-env.eba-y8ktwmfy.ap-southeast-2.elasticbeanstalk.com';
  useEffect(() => {
    fetch(`${apiUrl}/users`)
      .then((_) => _.json())
      .then(setUsers);
  }, []);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(users, value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionSelected = (event, { suggestion }) => {
    onValueChange(suggestion);
  };
  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Type a name',
    value,
    onChange,
  };
  return (
    <div className={styles.searchHeader}>
      <h1 className={styles.title}>Rx Find Me</h1>
      <div className={styles.searchInputBox}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default UserSearchInput;
