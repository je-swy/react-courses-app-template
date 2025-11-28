import { useState } from 'react';
import styles from './SearchBar.module.css';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import { BUTTON_TEXT, UI_TEXT } from '../../../../constants'; 

interface SearchBarProps {
  onSearch: (searchTerm: string) => void; // function for searching courses
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // state to hold the current search text
  const [searchText, setSearchText] = useState('');

  // function to handle search button click
  const handleSearchClick = () => {
    onSearch(searchText);
  };

  // function to handle input change
  const handleInputChange = (value: string) => {
    setSearchText(value);
    if (value.trim() === '') {
      onSearch('');
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <Input
        labelText='' // empty label for accessibility as described in figma
        placeholderText={UI_TEXT.SEARCH_PLACEHOLDER}
        value={searchText} // state value
        onChange={handleInputChange} // update state on input change
      />
      <Button
        buttonText={BUTTON_TEXT.SEARCH}
        onClick={handleSearchClick} // trigger search on button click
      />
    </div>
  );
};

export default SearchBar;