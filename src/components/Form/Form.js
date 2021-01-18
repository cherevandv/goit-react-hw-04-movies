import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function Form({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const onInputChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return toast('Enter some movie name');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <input
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={searchQuery}
        onChange={onInputChange}
      />
      <button type="submit" className="SearchForm-button">
        Search
      </button>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
