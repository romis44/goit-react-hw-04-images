import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Header, SearchForm, Button, Label, Input } from './Searchbar.styled';

export default function Searchbar({ onSearch }) {
  const [query, setQuery] = useState('');

  const onChange = e => {
    setQuery(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    onSearch(query);

    if (!query.trim()) {
      return toast.error('Please add correct data');
    }
    onSearch(query);
  };

  return (
    <Header>
      <SearchForm onSubmit={onSubmit}>
        <Button type="submit" style={{ marginRight: '10px' }}>
          <Label>Search</Label>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChange}
        />
      </SearchForm>
    </Header>
  );
}
