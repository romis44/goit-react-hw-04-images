import { Component } from 'react';
import { toast } from 'react-hot-toast';
import { Header, SearchForm, Button, Label, Input } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  onChange = e => {
    this.setState({ query: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { onSearch } = this.props;
    const { query } = this.state;

    if (!query.trim()) {
      return toast.error('Please add correct data');
    }
    onSearch(query);
  };

  render() {
    const { query } = this.state;

    return (
      <Header>
        <SearchForm onSubmit={this.onSubmit}>
          <Button type="submit" style={{ marginRight: '10px' }}>
            <Label>Search</Label>
          </Button>

          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.onChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
